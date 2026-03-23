import React, { SetStateAction, useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Card,
} from '@mui/material';
import EditBlogModal from './EditBlogModal';
import DeleteBlogModal from './DeleteBlogModal';
import NewBlogModal from './NewBlogModal';
import { IPostBlogEntity } from '@/interfaces/Blog';
import dayjs from 'dayjs';

export const BlogMainTable = (): React.ReactNode => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [blogs, setBlogs] = useState<IPostBlogEntity[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  
  const fetchBlogs = async (page: number, rowsPerPage: number) => {
    try {
      const response = await fetch(`/api/blogs?page=${page}&limit=${rowsPerPage}`);
      const data = await response.json();
      setBlogs(data.blogs);
      setTotalBlogs(data.total);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <NewBlogModal />
      <Card>
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripcion</TableCell>
                  <TableCell>Contenido</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.postId}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.description}</TableCell>
                    <TableCell>{blog.content}</TableCell>
                    <TableCell>{dayjs(blog.date).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      <EditBlogModal blog={blog} />
                      <DeleteBlogModal blog={blog} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalBlogs}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </Card>
    </div>
  );
};

export default BlogMainTable;
