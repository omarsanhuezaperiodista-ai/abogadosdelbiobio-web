/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { IPostBlogEntity } from '@/interfaces/Blog';
import dayjs from 'dayjs';

export const ThumbnailPost = ({ title, date, image, postId }: IPostBlogEntity)
  : React.ReactNode => (
  <li className="post-thumbnail-content">
    <img src={image} className="img-fluid" alt="" />
    <div className="post-title-date">
      <h6>
        <Link href={`/blog/${postId}`} passHref>
          {title}
        </Link>
      </h6>
      <span className="posted-on">
        <i className="far fa-calendar-alt" />
        <Link href={`/blog/${postId}`} passHref>
          {dayjs(date).format('DD-MM-YYYY')}
        </Link>
      </span>
    </div>
  </li>
);

export default ThumbnailPost;
