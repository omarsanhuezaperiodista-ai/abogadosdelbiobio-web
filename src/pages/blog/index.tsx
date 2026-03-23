import React from 'react';
import LastestNews from '../../components/Blog/LastestNews';
import PostList from '../../components/Blog/PostList';
import GetAQuote from '../../components/Blog/GetAQuote';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export const Blog: React.FC = () => (
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
                <h1 className="title">Blog</h1>
                <ul className="breadcrumbs-link">
                  <li><Link href="/">Inicio</Link></li>
                  <li className="">Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="blog-area pt-130 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <PostList />
          </div>
          <div className="col-lg-4">
            <div className="sidebar-widget-area">
              <div className="widget recent-post-widget mb-60 wow fadeInUp">
                <h4 className="widget-title">Ultimas entradas</h4>
                <ul className="recent-post-list">
                  <LastestNews />
                </ul>
              </div>
              <GetAQuote />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Blog;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || null;
  return {
    props: {
      isLoggedIn: !!token,
    },
  };
};
