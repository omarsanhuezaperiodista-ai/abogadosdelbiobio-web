import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminEmail } from '@/lib/config';
import { sendEmail } from '@/utils/email';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const nombre = req.body?.nombre?.trim();
    const correo = req.body?.correo?.trim();
    const asunto = req.body?.asunto?.trim();
    const mensaje = req.body?.mensaje?.trim();

    if (!nombre || !correo || !asunto || !mensaje) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const destinatario = getAdminEmail();

    const htmlContent = `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <p><strong>Mensaje:</strong> ${mensaje}</p>
    `;

    await sendEmail(destinatario, `Contacto: ${asunto}`, htmlContent, correo);

    return res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export default handler;
