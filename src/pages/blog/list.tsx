/* eslint-disable max-len */
import { GetServerSideProps } from 'next';
import BlogMainTable from '../../components/AdminBlog/BlogMainTable';
import Link from 'next/link';

export const BlogGrid = () => (
  <>
    <section className="hero-area">
      <div
        className="breadcrumbs-area bg_cover bg-with-overlay"
        style={{ backgroundImage: 'url(/static/assets/images/bg/breadcrumbs-bg.jpg)' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="page-title">
                <h1 className="title">Mantenedor de blog</h1>
                <ul className="breadcrumbs-link">
                  <li><Link href="/">Inicio</Link></li>
                  <li className="">Mantenedor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="service-area position-relative light-bg pt-120 pb-130">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-30 wow fadeInUp">
              <span className="sub-title">Mantenedor de blog</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="content">
              <BlogMainTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
export default BlogGrid;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || null;

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isLoggedIn: true,
    },
  };
};
