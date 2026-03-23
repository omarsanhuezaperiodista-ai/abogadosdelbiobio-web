import { IPostBlogEntity } from '@/interfaces/Blog';
import dayjs from 'dayjs';
import React from 'react';


export const PostBlogDetail = ({
  title, date, image, content, postId,
}: IPostBlogEntity): React.ReactNode => (
  <div className="blog-post-item">
    <div className="post-thumbnail">
      <img src={image} alt={postId} />
    </div>
    <div className="entry-content">
      <div className="post-meta">
        <ul>
          <li>
            <span>
              <i className="far fa-calendar-alt" />
              {dayjs(date).format('DD/MM/YYYY')}
            </span>
          </li>
        </ul>
      </div>
      <h3 className="title">
        {title}
      </h3>
      <p style={{ paddingBottom: '100px' }}>
        {content}
      </p>
    </div>
  </div>
);

export default PostBlogDetail;
