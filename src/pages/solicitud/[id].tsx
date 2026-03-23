/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { useRouter } from 'next/router';
import Voucher from '../../components/Solicitud/Voucher';
import { ICitasEntity } from '@/interfaces/Citas';
import { GetServerSideProps } from 'next';

export const Solicitud: React.FC = (): React.ReactNode => {
  const router = useRouter();
  const { id } = router.query;

  const [cita, setCita] = React.useState<ICitasEntity>({
    id: '',
    fecha: '',
    tipoConsulta: 'familiar',
    nombre: '',
    correo: '',
    telefono: '',
    valor: 0,
    token: '',
    flowOrder: 0,
    estado: 'pendiente',
  });

  React.useEffect(() => {
    async function getConsulta() {
      try {
        const response = await fetch(`/api/consultas/${id}`);
        const data: ICitasEntity = await response.json();
        setCita(data);
      } catch (error) {
        console.error(error);
      }
    }
    getConsulta();
  }, [id]);

  return (
    <div className="text-center fadeInUp" style={{ marginTop: '80px' }} data-wow-delay=".3s">
      <Voucher cita={cita} />
    </div>
  );
};
export default Solicitud;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || null;
  return {
    props: {
      isLoggedIn: !!token,
    },
  };
};
