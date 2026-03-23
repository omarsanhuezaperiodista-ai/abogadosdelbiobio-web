export interface ICitasEntity {
  fecha: string;
  tipoConsulta: 'familiar' | 'penal' | 'civil' | 'laboral';
  nombre: string;
  correo: string;
  telefono: string;
  id?: string;
  valor: number;
  flowOrder?: number;
  token?: string;
  estado?: 'pendiente' | 'pagada';
  paymentNotificationSentAt?: string;
  adminNotificationSentAt?: string;
}
