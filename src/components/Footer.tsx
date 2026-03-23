import React from 'react';
import LastestNews from './Blog/LastestNews';

export const Footer: React.FC = () => (
  <footer className="footer-area">
    <div className="footer-wrapper-one position-relative bg_cover pb-30" style={{ backgroundImage: 'url(/static/assets/images/bg/footer-bg-1.jpg)' }}>
      <div className="container">
        <div className="footer-widget pt-80 pb-20">
          <div className="row">
            <div className='col-lg-6' />
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="widget recent-post-widget mb-60 wow fadeInUp">
                <h4 className="widget-title">Ultimas entradas</h4>
                <LastestNews />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="widget contact-info-widget mb-55 wow fadeInUp" data-wow-delay=".5s">
                <h4 className="widget-title">Contacto</h4>
                <div className="info-widget-content mb-10">
                  <p>
                    <i className="fal fa-phone" />
                    <a href="tel:+56974999596">+569 74999596</a>
                  </p>
                  <p>
                    <i className="fal fa-envelope" />
                    <a href="mailto:helio.medell@gmail.com">helio.medell@gmail.com</a>
                  </p>
                  <p>
                    <i className="fal fa-map-marker-alt" />
                    TUCAPEL 452, OFICINA 815, CONCEPCIÓN.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-text text-center">
                <p>
                  &copy;2024
                  {' '}
                  <span>Abogados digitales Bío Bío</span>
                  {' '}
                  Desarollado por
                  {' '}
                  <a href='https://www.inforser.cl'>INFORSER</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
