import { IPostBlogEntity } from "@/interfaces/Blog";
import dayjs from "dayjs";
import Link from "next/link";

export default function LatestIndex(blog: IPostBlogEntity) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="blog-post-item blog-post-item-three mb-40 wow fadeInUp" data-wow-delay=".3s">
        <div className="post-thumbnail">
          <img src={blog.image} alt="blog" />
        </div>
        <div className="entry-content">
          <Link href={`/blog/${blog.postId}`} className="cat-btn">Ir a noticia</Link>
          <div className="post-meta">
            <ul>
              <li>
                <span>
                  <i className="fal fa-calendar-alt" />
                  <span>{dayjs(blog.date).format('DD-MM-YYYY')}</span>
                </span>
              </li>
            </ul>
          </div>
          <h3 className="title">
            <Link href={`/blog/${blog.postId}`}>
              {blog.title}
            </Link>
          </h3>
          <Link href={`/blog/${blog.postId}`} className="btn-link arrow-btn">Leer más</Link>
        </div>
      </div>
    </div>
  );
}
