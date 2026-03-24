import React from 'react';

export const Footer: React.FC = () => (
  <footer
    style={{
      background: '#0f172a',
      color: '#fff',
      padding: '25px 0',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 999,
    }}
  >
    <div className="container">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center',
        }}
      >

        {/* WHATSAPP */}
        <div>
          <strong>WhatsApp</strong><br />
          <a href="https://wa.me/56974999596" style={{ color: '#25D366' }}>
            +56 9 7499 9596
          </a>
        </div>

        {/* EMAIL */}
        <div>
          <strong>Email</strong><br />
          <a href="mailto:helio.medell@gmail.com" style={{ color: '#fff' }}>
            helio.medell@gmail.com
          </a>
        </div>

        {/* INSTAGRAM */}
        <div>
          <strong>Instagram</strong><br />
          <a
            href="https://www.instagram.com/abogadolitigante_/"
            target="_blank"
            style={{ color: '#E1306C' }}
          >
            @abogadolitigante_
          </a>
        </div>

        {/* FACEBOOK */}
        <div>
          <strong>Facebook</strong><br />
          <a
            href="https://www.facebook.com/medelabogados"
            target="_blank"
            style={{ color: '#1877F2' }}
          >
            medelabogados
          </a>
        </div>

        {/* DIRECCIÓN */}
        <div>
          <strong>Dirección</strong><br />
          Tucapel 452, Of. 815<br />
          Concepción
        </div>

      </div>

      {/* COPYRIGHT */}
      <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>
        © 2026 Abogados del Bío Bío
      </div>
    </div>
  </footer>
);

export default Footer;
