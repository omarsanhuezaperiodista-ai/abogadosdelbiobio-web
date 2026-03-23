/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export const Panel: React.FC = () => (
  <div className="offcanvas-panel">
    <div className="offcanvas-panel-inner">
      <div className="panel-logo">
        <a href="#">
          <img src="/static/assets/images/logo/logo.jpg" alt="Qempo" />
        </a>
      </div>
      <div className="about-us">
        <h5 className="panel-widget-title">Sobre nosotros</h5>
        <p>
          Somos un estudio jurídico especializado en el gran Concepción en el derecho privado, respaldados
          por una sólida trayectoria en litigación ante los tribunales de nuestro país, nuestra misión es
          otorgarle al cliente una correcta y oportuna asesoría y servicio legal personalizado según los
          requerimientos de su caso con el propósito de obtener una justicia reparadora acorde a las
          pretensiones de nuestros usuarios.
        </p>
      </div>
      <div className="contact-us">
        <h5 className="panel-widget-title">Contacto</h5>
        <ul>
          <li>
            <i className="fal fa-map-marker-alt" />
            Tucapel #452, OF 815, Concepción, Chile
          </li>
          <li>
            <i className="fal fa-envelope-open" />
            <a href="mailto:helio.medell@gmail.com">helio.medell@gmail.com</a>
          </li>
          <li>
            <i className="fal fa-phone" />
            <a href="tel:56974999596">(569) 7499 9596</a>
          </li>
        </ul>
      </div>
      <a href="#" className="panel-close"><i className="fal fa-times" /></a>
    </div>
  </div>
);

export default Panel;
