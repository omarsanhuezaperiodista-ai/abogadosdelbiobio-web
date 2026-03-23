import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { getAdminEmail, getAppBaseUrl } from '@/lib/config';
import { getDb, saveDb } from '@/lib/db';
import { ICitasEntity } from '@/interfaces/Citas';
import { generatePago } from '@/utils/pago';
import { sendEmail } from '@/utils/email';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();

  switch (req.method) {
    case 'GET':
      try {
        return res.status(200).json(db.data?.consultas || []);
      } catch (error) {
        console.error('Error fetching consultations:', error);
        return res.status(500).json({ message: 'Error al obtener las consultas' });
      }

    case 'POST':
      try {
        const fecha = req.body?.fecha?.trim();
        const tipoConsulta = req.body?.tipoConsulta;
        const nombre = req.body?.nombre?.trim();
        const correo = req.body?.correo?.trim();
        const telefono = req.body?.telefono?.trim();

        if (!fecha || !tipoConsulta || !nombre || !correo || !telefono) {
          return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si ya existe una consulta en la misma fecha
        const exist = db.data?.consultas.find(cita => cita.fecha === fecha);
        if (exist) throw new Error('Ya existe una consulta en esa fecha');

        // Crear nueva consulta
        const id = uuidv4();
        const newConsulta: ICitasEntity = {
          id,
          fecha,
          tipoConsulta,
          nombre,
          correo,
          telefono,
          valor: tipoConsulta === 'laboral' ? 0 : (tipoConsulta === 'penal' ? 40000 : 30000),
          token: '',
          flowOrder: 0,
          estado: 'pendiente',
        };

        db.data?.consultas.push(newConsulta);
        await saveDb(db);

        let urlReturn = `${getAppBaseUrl()}/solicitud/${id}`;

        // Generar URL de pago si no es consulta laboral
        if (tipoConsulta !== 'laboral') {
          const { token, url, flowOrder } = await generatePago({
            amount: newConsulta.valor,
            email: correo,
            id,
          });

          // Actualizar la consulta con el token y el flowOrder
          const consultaIndex = db.data?.consultas.findIndex(cita => cita.id === id);
          if (consultaIndex === -1 || consultaIndex === undefined) {
            throw new Error('Error al buscar consulta');
          }
          db.data!.consultas[consultaIndex] = { ...newConsulta, flowOrder, token };
          await saveDb(db);

          urlReturn = `${url}?token=${token}`;

          // Enviar correo de confirmación
          const emailContent = `
            <h1>Hola ${nombre},</h1>
            <p>Gracias por agendar tu consulta de tipo <b>${tipoConsulta}</b> para el <b>${fecha}</b>.</p>
            <p>Puedes completar tu pago siguiendo este enlace: <a href="${urlReturn}">Realizar Pago</a></p>
            <p>Recuerda que el link de pago expira en 10 minutos.</p>
          `;
          await sendEmail(correo, 'Link de Pago - Abogados del Biobío', emailContent, getAdminEmail());
        }

        setTimeout(async () => {
          try {
            const timeoutDb = await getDb();
            const consultaActualizada = timeoutDb.data?.consultas.find(cita => cita.id === id);

            if (consultaActualizada && consultaActualizada.estado !== 'pagada') {
              timeoutDb.data!.consultas = timeoutDb.data!.consultas.filter(cita => cita.id !== id);
              await saveDb(timeoutDb);
              console.log(`Consulta con ID ${id} eliminada por no ser pagada en 10 minutos`);
            }
          } catch (timeoutError) {
            console.error(`Error al limpiar la consulta ${id}:`, timeoutError);
          }
        }, 10 * 60 * 1000); // 10 minutos

        return res.status(200).json({ url: urlReturn });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error al crear la consulta:", error.message);
          return res.status(400).json({ message: 'Error al crear la consulta', error: error.message });
        } else {
          console.error("Error desconocido:", error);
          return res.status(500).json({ message: 'Error al crear la consulta', error: 'Error desconocido' });
        }
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

export default handler;
