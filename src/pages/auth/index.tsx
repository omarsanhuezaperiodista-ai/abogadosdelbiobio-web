import { FormEvent, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { TextField, Grid2 as Grid, Button } from '@mui/material';
import cookie from 'cookie';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/'); // Redirigir a la página de inicio después de iniciar sesión
      } else {
        const data = await response.json();
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error al iniciar sesión');
    }
  };

  return (
    <section className="service-area position-relative light-bg pt-120 pb-80">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-20 wow fadeInUp">
              <span className="sub-title">Autenticación</span>
              <h2>Iniciar sesión</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="content">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid size={8} textAlign='center'>
                    <TextField
                      label="Correo electrónico"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid size={8} textAlign='center'>
                    <TextField
                      label="Contraseña"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      fullWidth
                    />
                  </Grid>
                  {error && (
                    <Grid size={8} textAlign='center'>
                      <div style={{ color: 'red' }}>{error}</div>
                    </Grid>
                  )}
                  <Grid size={8} textAlign='center'>
                    <Button variant="contained" color="primary" type="submit">
                      Iniciar sesión
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || '');

  if (cookies.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}
