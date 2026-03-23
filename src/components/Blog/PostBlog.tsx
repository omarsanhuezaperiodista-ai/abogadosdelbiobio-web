/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { IPostBlogEntity } from '@/interfaces/Blog';
import dayjs from 'dayjs';

export const PostBlog = ({
  title, date, image, description, author, postId,
}: IPostBlogEntity)
  : React.ReactNode => (
  <div className="blog-post-item blog-post-item-six mb-30 wow fadeInUp" data-wow-delay=".2s">
    <div className="post-thumbnail">
      <img src={image} alt="Blog Thumb" />
      <Link href={`/blog/${postId}`} className='arrow'><i className="far fa-angle-right" /></Link>
    </div>
    <div className="entry-content">
      <div className="post-admin">
        <span>
          <img src="static/assets/images/blog/user-3.jpg" alt="User" />
          <a href="#">{author}</a>
        </span>
      </div>
      <h3 className="title">
        <a href="blog-details">
          {title}
        </a>
      </h3>
      <p>
        {description}
      </p>
      <div className="post-meta">
        <ul>
          <li>
            <span>
              <i className="far fa-calendar-alt" />
              <a href="#">{dayjs(date).format('DD-MM-YYYY')}</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default PostBlog;
