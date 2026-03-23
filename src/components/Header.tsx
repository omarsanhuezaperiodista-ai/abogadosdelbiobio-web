/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Header: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/auth', {
        method: 'GET',
      });

      if (response.ok) {
        router.push('/'); // Redirigir a la página de inicio después de cerrar sesión
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="header-area-one">
      <div className="header-logo-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-2">
              <div className="site-branding">
                <Link href="/" passHref>
                  <img style={{ height: '100%' }} src="/static/assets/images/logo/logo.jpg" alt="abogados" />
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-10" style={{ display: 'flex' }}>
              <div className="site-info" style={{ display: 'flex', width: '100%' }}>
                <ul className="info-list">
                  <li>
                    <div className="icon">
                      <a href="https://wa.me/56974999596">
                        <WhatsAppIcon />
                      </a>
                    </div>
                    <div className="info">
                      <span className="title">Whatsapp</span>
                      <h6><a href="https://wa.me/56974999596">(+569)74999596</a></h6>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <a href="mailto:helio.medell@gmail.com"><EmailIcon /></a>
                    </div>
                    <div className="info">
                      <span className="title">Email</span>
                      <h6><a href="mailto:helio.medell@gmail.com">helio.medell@gmail.com</a></h6>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <a href="https://www.instagram.com/abogadolitigante_/"><InstagramIcon /></a>
                    </div>
                    <div className="info">
                      <span className="title">Instagram</span>
                      <h6><a href="https://www.instagram.com/abogadolitigante_/">abogadolitigante_</a></h6>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <a href="https://www.facebook.com/medelabogados"><FacebookIcon /></a>
                    </div>
                    <div className="info">
                      <span className="title">Facebook</span>
                      <h6><a href="https://www.facebook.com/medelabogados">medelabogados</a></h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-navigation">
        <div className="container">
          <div className="navigation-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-8 col-4">
                <div className="primary-menu">
                  <div className="nav-menu">
                    <div className="navbar-close"><i className="far fa-times" /></div>
                    <nav className="main-menu">
                      <ul>
                        <li className="menu-item">
                          <Link href="/">Inicio</Link>
                        </li>
                        <li className="menu-item">
                          <Link href="/blog">Blog</Link>
                        </li>
                        {
                          isLoggedIn && (
                            <li className="menu-item">
                              <Link href="/blog/list">Editor de blog</Link>
                            </li>
                          )
                        }
                        <li className="menu-item">
                          <Link href="/contact">Contacto</Link>
                        </li>
                        <li className="menu-item">
                          {isLoggedIn ? (
                            <a onClick={handleLogout} style={{ color: 'red', cursor: 'pointer' }}>Salir</a>
                          ) : (
                            <Link href="/auth">Login</Link>
                          )}
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="navbar-toggler">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-8">
                <div className="header-right-nav d-flex align-items-center">
                  <ul>
                    <li>
                      <Link href="/agendarConsulta" passHref className="main-btn">
                        Agendar
                      </Link>
                    </li>
                    <li>
                      <Link href="/solicitud/buscar" passHref className="main-btn">
                        Estado
                      </Link>
                    </li>
                    <li className="off-nav-btn">
                      <div className="off-menu">
                        <span />
                        <span />
                        <span />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
