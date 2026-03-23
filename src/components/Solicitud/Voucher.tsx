/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from 'next/link';
import { ClpModel } from "@/lib/formater";
import { ICitasEntity } from '@/interfaces/Citas';

export const Voucher = ({ cita }: { cita: ICitasEntity }) => {
  return (
    <div className="cta-content" style={{ padding: '50px', backgroundImage: 'url(/static/assets/images/bg/counter-bg-1.jpg)' }}>
      <div className="icon" style={{ fontSize: '70px', marginBottom: '10px', color: 'white' }}>
        <i className="fal fa-check-circle" />
      </div>
      <h2 style={{ color: 'white' }}>Consulta agendada</h2>
      <div style={{ alignContent: 'center', margin: '10x' }}>
        <div className="table-responsive" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <table className="table table-bordered table-dark" style={{ maxWidth: '700px' }}>
            <tbody>
              <tr>
                <td className="col-3">
                  <b>Nombre</b>
                </td>
                <td className="col-3">{cita.nombre}</td>
              </tr>
              <tr>
                <td className="col-3">
                  <b>Correo</b>
                </td>
                <td className="col-3">{cita.correo}</td>
              </tr>
              <tr>
                <td className="col-3">
                  <b>Teléfono</b>
                </td>
                <td className="col-3">{cita.telefono}</td>
              </tr>
              <tr>
                <td className="col-3">
                  <b>Consulta</b>
                </td>
                <td className="col-3">{cita.tipoConsulta}</td>
              </tr>
              <tr>
                <td>
                  <b>Valor total</b>
                </td>
                <td>{new ClpModel(cita.valor ?? 0).formattedWithSign}</td>
              </tr>
              <tr>
                <td>
                  <b>Fecha</b>
                </td>
                <td>{cita.fecha}</td>
              </tr>
              <tr>
                <td>
                  <b>Estado de pago</b>
                </td>
                <td>{cita.estado}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link href="/" className="main-btn arrow-btn" style={{ marginRight: 40 }}>Volver a inicio</Link>
        <a href="#" className="main-btn" onClick={() => window.location.reload()}>RECARGAR</a>
      </div>
    </div>
  );
};

export default Voucher;
