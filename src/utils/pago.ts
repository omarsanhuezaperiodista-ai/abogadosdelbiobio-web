import { createHmac } from 'crypto';
import axios, { AxiosError } from 'axios';
import FormData from 'form-data'; // Usa el módulo 'form-data' para crear el cuerpo de la solicitud
import { getAppBaseUrl, getFlowConfig } from '@/lib/config';

export interface IPagoParams {
  amount: number;
  email: string;
  id: string;
  paymentMethod?: number;
}

function generateSignature(params: Record<string, any>, secretKey: string): string {
  const sortedKeys = Object.keys(params).sort();
  let toSign = '';

  sortedKeys.forEach(key => {
    toSign += `${key}${params[key]}`;
  });

  return createHmac('sha256', secretKey).update(toSign).digest('hex');
}

interface IPagoResponse {
  token: string;
  url: string;
  flowOrder: number;
}

export async function generatePago({ amount, email, id, paymentMethod = 9 }: IPagoParams): Promise<IPagoResponse> {
  try {
    const { apiKey, secretKey, endPoint } = getFlowConfig();
    const appBaseUrl = getAppBaseUrl();
    const params = {
      apiKey,
      commerceOrder: id,               // ID del comercio
      subject: 'Consulta jurídica',     // Asunto de la transacción
      currency: 'CLP',                  // Moneda
      amount: amount.toString(),        // Monto de la transacción
      email,                            // Email del pagador
      paymentMethod: paymentMethod.toString(), // Aseguramos que se pase como cadena
      timeout: '600',                   // Tiempo en segundos antes de que expire la transacción
      urlConfirmation: `${appBaseUrl}/api/confirmation`, // URL de confirmación
      urlReturn: `${appBaseUrl}/solicitud/${id}`,         // URL de retorno
    };

    // Generar la firma (excluyendo `s`)
    const s = generateSignature(params, secretKey);

    // Crear el form-data
    const form = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append('s', s); // Añadir la firma al form-data

    // Realizamos la solicitud a la API de Flow con form-data
    const response = await axios.post(`${endPoint}/payment/create`, form, {
      headers: {
        ...form.getHeaders(), // Añadir los encabezados necesarios para form-data
      },
    });

    const { token, url, flowOrder } = response.data;
    return { token, url, flowOrder };
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error("Error de Axios:", e.response?.data);
      throw new Error('Error al generar la URL de pago: ' + e.response?.data?.message);
    } else if (e instanceof Error) {
      console.error("Error:", e.message);
      throw new Error('Error al generar la URL de pago: ' + e.message);
    } else {
      console.error("Error desconocido");
      throw new Error('Error desconocido');
    }
  }
}

interface IValidatePagoResponse {
  flowOrder: number;
  status: number;
}

export async function validatePago(token: string): Promise<IValidatePagoResponse | Error> {
  try {
    const { apiKey, secretKey, endPoint } = getFlowConfig();
    const params = {
      apiKey,
      token,
    };

    const s = generateSignature(params, secretKey);
    const signedParams = { ...params, s };
    const paramsString = new URLSearchParams(signedParams).toString();

    const response = await axios.get(`${endPoint}/payment/getStatus?${paramsString}`);
    const { flowOrder, status } = response.data;

    return { flowOrder, status };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new Error('Error al validar el pago: ' + e.message);
    }
    return new Error('Error desconocido al validar el pago');
  }
}
