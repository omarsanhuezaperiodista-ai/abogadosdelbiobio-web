/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from 'next/link';
import { TextField } from '@mui/material';
import { GetServerSideProps } from 'next';

export const Buscar: React.FC = (): React.ReactNode => {
  const [buscar, setBuscar] = React.useState<string>('');
  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => setBuscar(e.target.value);
  return (
    <div className="text-center fadeInUp" style={{ marginTop: '80px' }} data-wow-delay=".3s">
      <div className="cta-content" style={{ padding: '50px', backgroundImage: 'url(/static/assets/images/bg/counter-bg-1.jpg)' }}>
        <div className="icon" style={{ fontSize: '70px', marginBottom: '10px', color: 'white' }}>
          <i className="fal fa-magnifying-glass" />
        </div>
        <h2 style={{ color: 'white' }}>Buscar consulta</h2>
        <div style={{ alignContent: 'center', margin: '10x' }}>
          <TextField
            onChange={handleBuscar}
            value={buscar}
            sx={{ backgroundColor: 'white', width: '400px', marginY: 10 }}
          />
        </div>
        <div style={{ alignContent: 'center', margin: '10x' }}>
          <Link href={`/solicitud/${buscar}`} className="main-btn arrow-btn">Buscar</Link>
        </div>
      </div>
    </div>
  );
};
export default Buscar;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || null;
  return {
    props: {
      isLoggedIn: !!token,
    },
  };
};