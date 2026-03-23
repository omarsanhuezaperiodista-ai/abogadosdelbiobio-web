import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import EditButton from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { IPostBlogEntity } from '@/interfaces/Blog';

const EditBlogModal = ({ blog }: { blog: IPostBlogEntity }) => {
  const [open, setOpen] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState({
    title: blog.title,
    description: blog.description,
    content: blog.content,
    date: dayjs(blog.date),
    author: blog.author,
  });
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedBlog({
      ...updatedBlog,
      [name]: value,
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('title', updatedBlog.title);
    formData.append('description', updatedBlog.description);
    formData.append('content', updatedBlog.content);
    formData.append('date', updatedBlog.date.toISOString());
    formData.append('author', updatedBlog.author);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`/api/blogs/admin/${blog.postId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        await response.json();
        setOpen(false);
        router.reload();
      } else {
        console.error('Error al editar el blog post');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 900,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="success">
        <EditButton />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" id="modal-modal-title" sx={{ mb: 2 }}>
            Editar blog
          </Typography>
          <TextField
            label="Título"
            name="title"
            value={updatedBlog.title}
            onChange={handleInputChange}
            sx={{ mb: 1, width: '80%' }}
          />
          <TextField
            label="Autor"
            name="author"
            value={updatedBlog.author}
            onChange={handleInputChange}
            sx={{ mb: 1, width: '80%' }}
          />
          <TextField
            label="Descripción"
            name="description"
            value={updatedBlog.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            sx={{ mb: 1, width: '80%' }}
          />
          <TextField
            label="Contenido"
            name="content"
            value={updatedBlog.content}
            onChange={handleInputChange}
            multiline
            rows={18}
            sx={{ mb: 1, width: '80%' }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2 }}
          >
            Subir nueva Imagen
            <input
              type="file"
              hidden
              onChange={handleImageChange}
              accept="image/*"
            />
          </Button>
          <Box>

            <Button
              onClick={handleEdit}
              variant="contained"
              color="success"
              sx={{ mt: 2, mr: 1 }}
            >
              Editar
            </Button>
            <Button
              onClick={() => handleClose()}
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditBlogModal;
