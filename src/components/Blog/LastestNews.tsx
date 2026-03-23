import React, { useEffect, useState } from 'react';
import ThumbnailPost from './ThumbnailPost';
import { IPostBlogEntity } from '@/interfaces/Blog';

export const LastestNews = () => {
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
    <ul className="post-widget-list">
      {latestBlogs.length > 0 ? (
        latestBlogs.map((data, index) => <ThumbnailPost key={index} {...data} />)
      ) : (
        <p>No hay entradas disponibles.</p>
      )}
    </ul>
  );
};

export default LastestNews;
