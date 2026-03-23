import Link from 'next/link';
import React from 'react';

export const GetAQuote = (): React.ReactNode => {
  const card = {
    header: 'Agendar',
    title: 'Agenda una cita con nosotros',
    button: 'Agendar',
  };

  return (
    <div
      className="widget banner-widget bg_cover mb-50 wow fadeInUp"
      data-wow-delay=".5s"
      style={{ backgroundImage: 'url(/static/assets/images/widget/banner-1.jpg)' }}
    >
      <div className="banner-content">
        <span className="span">{card.header}</span>
        <h3>
          {card.title}
        </h3>
        <Link href="/agendarConsulta" className="main-btn">{card.button}</Link>
      </div>
    </div>
  );
};

export default GetAQuote;
