import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminEmail, getAppBaseUrl } from '@/lib/config';
import { getDb, saveDb } from '@/lib/db';
import { validatePago } from '@/utils/pago';
import { sendEmail } from '@/utils/email';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();
  const { id } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const cita = db.data?.consultas.find(cita => cita.id === id);
        if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
        if (cita.estado === 'pagada') return res.status(200).json(cita)
        if (!cita.token) return res.status(200).json(cita);
        const resp = await validatePago(cita.token);
        if (resp instanceof Error) {
          console.error(resp.message);
          return res.status(200).json(cita);
        }
        const { status, flowOrder } = resp;
        if (flowOrder === cita.flowOrder) {
          if (status === 2) {
            let shouldPersist = true;
            cita.estado = 'pagada';

            if (!cita.paymentNotificationSentAt) {
              const emailContentClient = `
                <h1>Hola ${cita.nombre},</h1>
                <p>Nos complace informarte que tu consulta ha sido <b>pagada</b> con éxito.</p>
                <p>Consulta agendada para el <b>${cita.fecha}</b>.</p>
                <p>También puedes revisar el estado de tu solicitud en: ${getAppBaseUrl()}/solicitud/${id}</p>
                <p>Gracias por confiar en nuestros servicios.</p>
              `;

              await sendEmail(cita.correo, 'Confirmación de Pago - Abogados del Biobío', emailContentClient, getAdminEmail());
              cita.paymentNotificationSentAt = new Date().toISOString();
              shouldPersist = true;
            }

            if (!cita.adminNotificationSentAt) {
              const emailContentAdmin = `
                <h1>Nuevo Cliente con Cita Agendada</h1>
                <p>El cliente <b>${cita.nombre}</b> ha agendado y pagado una consulta.</p>
                <p>Detalles de la cita:</p>
                <ul>
                  <li><b>Fecha:</b> ${cita.fecha}</li>
                  <li><b>Nombre cliente:</b> ${cita.nombre}</li>
                  <li><b>Consulta:</b> ${cita.tipoConsulta}</li>
                  <li><b>Correo del Cliente:</b> ${cita.correo}</li>
                  <li><b>Teléfono del Cliente:</b> ${cita.telefono}</li>
                </ul>
              `;

              await sendEmail(getAdminEmail(), 'Notificación de Nueva Cita Pagada', emailContentAdmin, cita.correo);
              cita.adminNotificationSentAt = new Date().toISOString();
              shouldPersist = true;
            }

            if (shouldPersist) {
              await saveDb(db);
            }
          }
          return res.status(200).json(cita);
        } else throw new Error('Error al confirmar la cita');
      } catch (error: unknown) {
        console.error(error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Error al obtener la cita' });
      }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }
}

export default handler;
