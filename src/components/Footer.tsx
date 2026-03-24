import React from 'react';
import LastestNews from './Blog/LastestNews';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Footer: React.FC = () => (
  <footer className="footer-area">
    <div
      className="footer-wrapper-one position-relative bg_cover"
      style={{
        backgroundImage: 'url(/static/assets/images/bg/footer-bg-1.jpg)',
        padding: '20px 0', // 🔥 MÁS CHICO
      }}
    >
      <div className="container">
        <div className="footer-widget">
          <div
            className="row"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px',
            }}
          >
            {/* WHATSAPP */}
            <div>
              <h6>WhatsApp</h6>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <WhatsAppIcon style={{ color: '#25D366' }} />
                <a href="https://wa.me/56974999596">+56 9 7499 9596</a>
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <h6>Email</h6>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <EmailIcon />
                <a href="mailto:helio.medell@gmail.com">
                  helio.medell@gmail.com
                </a>
              </p>
            </div>

            {/* INSTAGRAM */}
            <div>
              <h6>Instagram</h6>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <InstagramIcon style={{ color: '#E1306C' }} />
                <a href="https://www.instagram.com/abogadolitigante_">
                  @abogadolitigante_
                </a>
              </p>
            </div>

            {/* FACEBOOK */}
            <div>
              <h6>Facebook</h6>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FacebookIcon style={{ color: '#1877F2' }} />
                <a href="https://www.facebook.com/medelabogados">
                  medelabogados
                </a>
              </p>
            </div>

            {/* DIRECCIÓN */}
            <div>
              <h6>Dirección</h6>
              <p>Tucapel 452, Of. 815</p>
              <p>Concepción</p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <p style={{ fontSize: '12px', margin: 0 }}>
            © 2026 Abogados del Bío Bío
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
