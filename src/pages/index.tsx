import LatestIndex from "@/components/Blog/LatestIndex";
import { IPostBlogEntity } from "@/interfaces/Blog";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [latestBlogs, setLatestBlogs] = useState<IPostBlogEntity[]>([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await fetch('/api/blogs/latest');
        if (response.ok) {
          const data: IPostBlogEntity[] = await response.json();
          setLatestBlogs(data);
        } else {
          console.error('Failed to fetch latest blogs');
        }
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <>
      <section className="hero-area" style={{ marginTop: 0 }}>
        <div
          className="hero-wrpper-two bg-with-overlay bg_cover"
          style={{
            backgroundImage: 'url(/static/assets/images/hero/hero-two-bg-1.jpg)',
            minHeight: '620px',
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: '70px',
            paddingBottom: '40px',
          }}
        >
          <div className="container" style={{ width: '100%' }}>
            <div
              className="row"
              style={{
                alignItems: 'flex-start',
              }}
            >
              <div className="col-lg-7">
                <div
                  className="hero-content"
                  style={{
                    paddingTop: '10px',
                  }}
                >
                  <span
                    className="span wow fadeInUp"
                    data-wow-delay=".5s"
                    style={{
                      display: 'inline-block',
                      marginBottom: '14px',
                      fontSize: '18px',
                    }}
                  >
                    Bienvenido a
                  </span>

                  <h1
                    className="wow fadeInDown"
                    data-wow-delay=".7s"
                    style={{
                      marginBottom: '24px',
                      lineHeight: '1.05',
                    }}
                  >
                    Abogados del Bío Bío
                  </h1>

                  <p style={{ margin: 0 }} />

                  <p
                    className="experience"
                    style={{
                      fontSize: '32px',
                      lineHeight: '1.6',
                      maxWidth: '980px',
                      marginTop: '10px',
                      color: '#ffffff',
                    }}
                  >
                    Estudio jurídico en Concepción, especializado en litigación y asesoría legal.
                    <br />
                    Representación directa, atención personalizada y compromiso real en cada caso.
                    <br />
                    Oficina ubicada frente a tribunales. Agenda tu consulta por WhatsApp.
                  </p>
                </div>
              </div>

              <div className="col-lg-5">
                <div
                  className="hero-img wow fadeInRight"
                  data-wow-delay=".90s"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingTop: '0px',
                  }}
                >
                  <img
                    src="/static/assets/images/hero/hero-two-img-1.png"
                    alt="Hero Imageee"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: '560px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '80px' }}>
        <div className="cta-area cta-area-one" style={{ marginBottom: '0px' }}>
          <div className="container">
            <div className="row cta-wrapper-one">
              <div className="col-lg-6">
                <div className="cta-item text-center fadeInUp" data-wow-delay=".3s">
                  <div className="cta-overlay bg_cover" style={{ backgroundImage: 'url(static/assets/images/bg/counter-bg-1.jpg)' }} />
                  <div className="cta-content">
                    <h2>
                      Misión
                    </h2>
                    <p>
                      Ser un estudio de abogados reconocido por su alta
                      calidad en la asistencia jurídica y la profesionalidad
                      de sus miembros, brindando seguridad y confianza a través
                      de soluciones integrales y adecuadas a las necesidades de
                      cada cliente, con el compromiso del éxito en sus negocios.
                      Asimismo, lograr la realización personal y profesional de
                      los miembros del Estudio, dentro de los más
                      altos estándares éticos y de excelencia.
                      {' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div style={{ height: '100%' }} className="cta-item text-center fadeInUp" data-wow-delay=".3s" >
                  <div className="cta-overlay bg_cover" style={{ backgroundImage: 'url(static/assets/images/cta/cta-card-1.jpg)' }} />
                  <div className="cta-content" >
                    <h2>
                      Visión
                    </h2>
                    <p>
                      Ser un estudio jurídico líder
                      en el mercado legal chileno,
                      consolidando su crecimiento con
                      experiencia y eficiencia profesional,
                      ofreciendo un servicio integral de calidad
                      en asesoría y consultoría legal,
                      con reconocido prestigio por sus
                      valores y eficacia demostrada.
                      {' '}
                    </p>
                    <p />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-area">
        <div className="container">
          <div className="features-wrapper-two pt-130 pb-80">
            <div className="row">
              <div className="col-lg-5">
                <div className="features-img mb-50 wow fadeInLeft">
                  <img src="/static/assets/images/features/features-2.jpg" alt="Features" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="features-content-box features-content-box-two mb-50">
                  <div className="section-title section-title-left mb-25 wow fadeInUp" data-wow-delay=".2s">
                    <h2 style={{ marginTop: '20px' }}>
                      Nuestros valores
                    </h2>
                  </div>
                  <div className="features-item-list">
                    <div className="features-item features-item-two d-flex wow fadeInUp" data-wow-delay=".3s">
                      <div className="icon">
                        <i className="fal fa-user" />
                      </div>
                      <div className="content">
                        <div className="title">
                          <h4>Ética</h4>
                        </div>
                      </div>
                    </div>
                    <div className="features-item features-item-two d-flex wow fadeInUp" data-wow-delay=".3s">
                      <div className="icon">
                        <i className="fal fa-handshake" />
                      </div>
                      <div className="content">
                        <div className="title">
                          <h4>Compromiso</h4>
                        </div>
                      </div>
                    </div>
                    <div className="features-item features-item-two d-flex wow fadeInUp" data-wow-delay=".4s">
                      <div className="icon">
                        <i className="fal fa-medal" />
                      </div>
                      <div className="content">
                        <div className="title">
                          <h4>Calidad</h4>
                        </div>
                      </div>
                    </div>
                    <div className="features-item features-item-two d-flex wow fadeInUp" data-wow-delay=".4s">
                      <div className="icon">
                        <i className="fal fa-lock" />
                      </div>
                      <div className="content">
                        <div className="title">
                          <h4>Confidencialidad</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-area service-bg-map pt-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-75 wow fadeInUp" data-wow-delay=".2s">
                <h2>Áreas de trabajo</h2>
              </div>
            </div>
          </div>
          <div className="row no-gutters service-wrapper-one">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="service-item service-item-two text-center wow fadeInUp" data-wow-delay=".25s">
                <div className="item-bg bg_cover" style={{ backgroundImage: 'url(/static/assets/images/features/features-1.jpg)' }} />
                <div className="icon">
                  <i className="flaticon-contract" />
                </div>
                <div className="content">
                  <h4>DERECHO LABORAL</h4>
                  <p>
                    otorgamos asesoría tanto a empresas como a trabajadores
                    y sindicatos en diversas materias tales como despidos injustificados,
                    despido indirecto, nulidad, cobro de prestaciones, demandas de tutela
                    laboral por vulneración de derechos fundamentales, indemnizaciones,
                    accidentes laborales, cobro de finiquitos entre otros.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div style={{ height: '100%' }} className="service-item service-item-two text-center wow fadeInUp" data-wow-delay=".30s">
                <div className="item-bg bg_cover" style={{ backgroundImage: 'url(/static/assets/images/features/features-1.jpg)' }} />
                <div className="icon">
                  <i className="flaticon-libra" />
                </div>
                <div className="content">
                  <h4>DERECHO CIVIL</h4>
                  <p>
                    ofrecemos representación legal en causas
                    civiles tales como herencias,
                    posesiones efectivas, juicios de arrendamiento,
                    indemnización de perjuicios, juicios de partición entre otros.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="service-item service-item-two text-center wow fadeInUp" data-wow-delay=".35s">
                <div className="item-bg bg_cover" style={{ backgroundImage: ' url(/static/assets/images/features/features-1.jpg)' }} />
                <div className="icon">
                  <i className="flaticon-judge" />
                </div>
                <div className="content">
                  <h4>Derecho de familia</h4>
                  <p>
                    te representamos en causas de familia, donde contaras
                    con abogados con magister en derecho de familia a fin
                    de otorgar una correcta asesoría y defensa legal en asuntos
                    tan importantes como las relaciones familiares en causas
                    tales como demanda de alimentos, rebaja y cese de pensión,
                    divorcios, demanda de relación directa y regular, compensación
                    económica, denuncias por violencia intrafamiliar,
                    causas de protección de menores etc.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div style={{ height: '100%' }} className="service-item service-item-two text-center wow fadeInUp" data-wow-delay=".40s">
                <div className="item-bg bg_cover" style={{ backgroundImage: ' url(/static/assets/images/features/features-1.jpg)' }} />
                <div className="icon">
                  <i className="flaticon-bail" />
                </div>
                <div className="content">
                  <h4>Derecho penal</h4>
                  <p>
                    ofrecemos representación jurídica en áreas del derecho penal,
                    analizando y proponiendo ideas claras desde un principio para
                    solucionar tu problema lo antes posible, y siempre actuando
                    dentro del marco jurídico en la representación de estos procesos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '100px' }} className="team-area">
        <div className="team-bg-wrapper bg_cover pt-200 pb-180" style={{ backgroundImage: ' url(/static/assets/images/bg/team-bg-1.jpg)' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="section-title text-center section-title-white mb-75 wow fadeInUp" data-wow-delay=".2s">
                  <h2>Valor agendamiento de consultas</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="team-item team-item-one mb-40 wow fadeInUp" data-wow-delay=".25s">
                  <div className="team-img">
                    <img src="/static/assets/images/case/case-14.jpg" alt="Team" />
                    <div className="team-overlay">
                      <div className="button text-center mb-30 mt-30 wow fadeInUp" data-wow-delay=".50s">
                        <Link href="/agendarConsulta" className="main-btn">Agendar</Link>
                      </div>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3 className="title"><Link href="/agendarConsulta">Laboral</Link></h3>
                    <span className="position">Sin costo</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="team-item team-item-one mb-40 wow fadeInUp" data-wow-delay=".30s">
                  <div className="team-img">
                    <img src="/static/assets/images/case/case-1.jpg" alt="Team" />
                    <div className="team-overlay">
                      <div className="button text-center mb-30 mt-30 wow fadeInUp" data-wow-delay=".50s">
                        <Link href="/agendarConsulta" className="main-btn">Agendar</Link>
                      </div>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3 className="title"><Link href="/agendarConsulta">Civil</Link></h3>
                    <span className="position">$30.000</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="team-item team-item-one mb-40 wow fadeInUp" data-wow-delay=".35s">
                  <div className="team-img">
                    <img src="/static/assets/images/case/case-9.jpg" alt="Team" />
                    <div className="team-overlay">
                      <div className="button text-center mb-30 mt-30 wow.fadeInUp" data-wow-delay=".50s">
                        <Link href="/agendarConsulta" className="main-btn">Agendar</Link>
                      </div>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3 className="title"><Link href="/agendarConsulta">Familia</Link></h3>
                    <span className="position">$30.000</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="team-item team-item-one mb-40 wow fadeInUp" data-wow-delay=".40s">
                  <div className="team-img">
                    <img src="/static/assets/images/case/case-3.jpg" alt="Team" />
                    <div className="team-overlay">
                      <div className="button text-center mb-30 mt-30 wow fadeInUp" data-wow-delay=".50s">
                        <Link href="/agendarConsulta" className="main-btn">Agendar</Link>
                      </div>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3 className="title"><Link href="/agendarConsulta">Penal</Link></h3>
                    <span className="position">$40.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '100px' }} className="about-area pb-120">
        <div className="container">
          <div className="about-wrapper-two">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-content-box about-content-box-two wow fadeInLeft" data-wow-delay=".3s">
                  <div className="section-title section-title-left mb-25">
                    <h2 style={{ marginTop: '100px' }}>
                      Metodología de trabajo
                    </h2>
                  </div>
                  <p>
                    Nuestro estudio en primer lugar le otorga al
                    usuario una reunión a fin de aclarar consultas
                    legales que tengas al momento de contratar con nosotros,
                    si el caso reviste de mayor complejidad se planifica una defensa y se da a conocer el presupuesto por los
                    servicios requeridos, aceptado se da inicio a las
                    respectivas acciones legales priorizando siempre
                    la integridad de nuestro cliente.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="play-content-img bg_cover wow fadeInRight" data-wow-delay=".4s" style={{ backgroundImage: 'url(/static/assets/images/tribunales.webp)' }}>
                  {/* <a href="/#" className="video-popup"><i className="fas fa-play" /></a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title section-title-left mb-75 wow fadeInUp" data-wow-delay=".2s">
                <h2>Noticias recientes</h2>
              </div>
            </div>
          </div>
          <div className="row">

            {
              latestBlogs.length 
              ? latestBlogs.map((blog, index) => (<LatestIndex key={index} {...blog} />))
              : <p>No hay entradas disponibles.</p>
            }

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
 need to replace this whole file please. the thing is text not showing because footer fixed overlays. Need complete file maybe add bottom margin? But user wants hero visible. Actually footer fixed overlays bottom of viewport; easiest is footer not fixed. But user wanted persistent while scrolling. Yet now it's hiding content. Could instead add enough top padding? no, if fixed footer overlays lower part, still hero visible maybe if hero content starts too low. Better put hero section minheight smaller and align content to top. The code already does this. But on screenshot after previous attempts, text missing entirely, perhaps because CSS global moved hero-content too far with margin-top?? But user now asks replace whole file. Could provide full file with hero-content explicitly marginTop and wrapper minHeight 420 etc. Since footer overlay stays. Also could add bottom padding inside hero wrapper to accommodate footer overlay and text. And maybe image smaller and align bottom. Let's craft concise. Mention replace whole file. There may still be CSS overrides from global. But can inline style with !important not possible. Could perhaps use style marginTop:'-120px' but screenshot indicates text not visible at all maybe because background section starts under footer due fixed and content lower. Let's make hero wrapper minHeight 420, paddingTop 10, content marginTop 20, row align items center. Also maybe add position relative zIndex. Let's provide full file only as requested.
