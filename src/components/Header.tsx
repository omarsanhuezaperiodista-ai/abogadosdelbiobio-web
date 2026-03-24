/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/auth', {
        method: 'GET',
      });

      if (response.ok) {
        router.push('/');
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
          <div className="row align-items-center">

            {/* LOGO */}
            <div className="col-lg-3 col-md-12">
              <div className="site-branding">
                <Link href="/" passHref>
                  <img
                    style={{ height: '100%' }}
                    src="/static/assets/images/logo/logo.jpg"
                    alt="abogados"
                  />
                </Link>
              </div>
            </div>

            {/* MENÚ AL LADO DEL LOGO */}
            <div className="col-lg-9 col-md-12">
              <nav className="main-menu">
                <ul
                  style={{
                    display: 'flex',
                    gap: '25px',
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    alignItems: 'center',
                  }}
                >
                  <li className="menu-item">
                    <Link href="/">Inicio</Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/blog">Blog</Link>
                  </li>

                  {isLoggedIn && (
                    <li className="menu-item">
                      <Link href="/blog/list">Editor de blog</Link>
                    </li>
                  )}

                  <li className="menu-item">
                    <Link href="/contact">Contacto</Link>
                  </li>

                  <li className="menu-item">
                    {isLoggedIn ? (
                      <a
                        onClick={handleLogout}
                        style={{ color: 'red', cursor: 'pointer' }}
                      >
                        Salir
                      </a>
                    ) : (
                      <Link href="/auth">Login</Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>

      {/* BOTONES ABAJO (AGENDAR / ESTADO) */}
      <div className="header-navigation">
        <div className="container">
          <div className="navigation-wrapper">
            <div className="row align-items-center">

              <div className="col-lg-8 col-4">
                <div className="navbar-toggler">
                  <span />
                  <span />
                  <span />
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
  );
};

export default Header;
