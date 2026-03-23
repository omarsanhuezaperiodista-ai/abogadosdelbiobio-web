import React, { useEffect, useState } from 'react';
import PostBlog from './PostBlog';
import { IPostBlogEntity } from '@/interfaces/Blog';
import { Button } from '@mui/material';

export const PostList = () => {
  const [allBlogs, setAllBlogs] = useState<IPostBlogEntity[]>([]);
  const [page, setPage] = useState(0); // Estado para controlar la página actual
  const [limit] = useState(5); // Límite de blogs por página
  const [totalBlogs, setTotalBlogs] = useState(0); // Total de blogs disponibles

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs?page=${page}&limit=${limit}`);
        if (response.ok) {
          const data = await response.json();
          setAllBlogs(data.blogs);
          setTotalBlogs(data.total); // Total de blogs desde la API
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchAllBlogs();
  }, [page, limit]);

  const handleNextPage = () => {
    if ((page + 1) * limit < totalBlogs) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {allBlogs.length > 0 ? (
        allBlogs.map((data) => <PostBlog key={data.postId} {...data} />)
      ) : (
        <p>No hay entradas disponibles.</p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handlePreviousPage} disabled={page === 0}>
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={(page + 1) * limit >= totalBlogs}
        >
          Siguiente
        </Button>
      </div>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Página {page + 1} de {Math.ceil(totalBlogs / limit)}
      </p>
    </div>
  );
};

export default PostList;
