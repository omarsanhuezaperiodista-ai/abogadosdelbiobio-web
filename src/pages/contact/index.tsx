import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' }); // Limpiar el formulario
      } else {
        const { message } = await response.json();
        setError(message || 'Ocurrió un error al enviar el mensaje.');
      }
    } catch (error) {
      setError('Error en la solicitud. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="hero-area">
        <div
          className="breadcrumbs-area bg_cover bg-with-overlay"
          style={{ backgroundImage: 'url(static/assets/images/bg/breadcrumbs-bg.jpg)' }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <div className="page-title">
                  <h1 className="title">Contacto</h1>
                  <ul className="breadcrumbs-link">
                    <li><Link href="/">Inicio</Link></li>
                    <li className="">Contacto</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-area pt-130 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="contact-wrapper-three mb-50 wow fadeInRight" wow-data-delay="3s">
                <div className="section-title mb-30">
                  <h2>Déjanos un mensaje</h2>
                  <p>Estamos listos para ayudarte</p>
                </div>
                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form_group">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <input
                            type="email"
                            className="form_control"
                            placeholder="Correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Asunto"
                            name="asunto"
                            value={formData.asunto}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <textarea
                            className="form_control"
                            placeholder="Mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_group">
                          <button className="main-btn" type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar mensaje'}
                          </button>
                        </div>
                      </div>
                      {error && (
                        <div className="col-lg-12">
                          <div className="form_group">
                            <p style={{ color: 'red' }}>{error}</p>
                          </div>
                        </div>
                      )}
                      {success && (
                        <div className="col-lg-12">
                          <div className="form_group">
                            <p style={{ color: 'green' }}>Mensaje enviado con éxito.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || null;
  return {
    props: {
      isLoggedIn: !!token,
    },
  };
};