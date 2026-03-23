import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostBlogDetail from '@/components/Blog/PostBlogDetail';
import GetAQuote from '@/components/Blog/GetAQuote';
import LastestNews from '@/components/Blog/LastestNews';
import Link from 'next/link';
import { IPostBlogEntity } from '@/interfaces/Blog';
import { GetServerSideProps } from 'next';

export const BlogDetails: React.FC = (): React.ReactNode => {
  const [post, setPost] = useState<IPostBlogEntity | null>(null);
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(`/api/blogs/${postId}`);
          if (response.ok) {
            const data: IPostBlogEntity = await response.json();
            setPost(data);
          } else {
            setPost(null);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          setPost(null);
        }
      }
    };

    fetchPost();
  }, [postId]);

  return (
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
                  <h1 className="title">Detalle del blog</h1>
                  <ul className="breadcrumbs-link">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li className="">Blog details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-area pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-container mb-50 wow fadeInUp">
                {post ? (
                  <PostBlogDetail {...post} />
                ) : (
                  <h1>Entrada no encontrada</h1>
                )}
              </div>
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
      </div>
    </>
  );
};

export default BlogDetails;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || null;
  return {
    props: {
      isLoggedIn: !!token,
    },
  };
};
