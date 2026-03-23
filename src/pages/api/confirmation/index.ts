import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb, saveDb } from '@/lib/db';
import { validatePago } from '@/utils/pago';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token requerido' });
    }

    // Validar el pago con Flow
    const result = await validatePago(token);
    if (result instanceof Error) {
      return res.status(500).json({ message: result.message });
    }

    const { flowOrder, status } = result;

    // Actualizar el estado de la consulta en la base de datos
    const consultaIndex = db.data?.consultas.findIndex(cita => cita.flowOrder === flowOrder);
    if (consultaIndex === -1 || consultaIndex === undefined) {
      return res.status(404).json({ message: 'Consulta no encontrada' });
    }

    db.data!.consultas[consultaIndex].estado = status === 2 ? 'pagada' : 'pendiente'; // 2 pagada, 3 rechazada
    await saveDb(db);

    return res.status(200).json({ message: 'Estado actualizado', status });
  } catch (error: unknown) {
    console.error('Error al procesar la confirmación:', error);
    return res.status(500).json({ message: 'Error al procesar la confirmación' });
  }
}

export default handler;
