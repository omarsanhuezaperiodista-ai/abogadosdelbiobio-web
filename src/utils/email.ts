import nodemailer from 'nodemailer';
import { getSmtpConfig } from '@/lib/config';

export async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const smtpConfig = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: smtpConfig.auth,
  });

  const mailOptions = {
    from: smtpConfig.from,
    replyTo: replyTo ?? smtpConfig.from,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
}
