import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';

const NewBlogModal = () => {
  const [open, setOpen] = useState(false);
  const initialState = {
    title: '',
    description: '',
    content: '',
    author: '',
  }
  const [newBlog, setNewBlog] = useState(initialState);
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
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('author', newBlog.author);
    formData.append('description', newBlog.description);
    formData.append('content', newBlog.content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/blogs/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await response.json();       
        handleClose()
        setNewBlog(initialState);
        setImage(null);
        router.reload();
      } else {
        console.error('Error al crear el blog post');
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
    <div style={{ marginBottom: '30px' }}>
      <Button sx={{ mb: 1 }} variant='contained' color='primary' onClick={handleOpen}>Agregar nuevo registro</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" id="modal-modal-title">
            Crear un nueva entrada
          </Typography>
          <TextField
            label="Título"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            sx={{ mb: 1, width: '80%' }}
          />

          <TextField
            label="Autor"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
            sx={{ mb: 1, width: '80%' }}
          />

          <TextField
            label="Descripción"
            name="description"
            value={newBlog.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            sx={{ mb: 1, width: '80%' }}
          />

          <TextField
            label="Contenido"
            name="content"
            value={newBlog.content}
            onChange={handleInputChange}
            multiline
            rows={14}
            sx={{ mb: 1, width: '80%' }}
          />

          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2 }}
          >
            Subir Imagen
            <input
              type="file"
              hidden
              onChange={handleImageChange}
              accept="image/*"
            />
          </Button>

          <Box>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Agregar
            </Button>
            <Button
              onClick={() => handleClose()}
              variant="contained"
              color="error"
              sx={{ mt: 2, ml: 1 }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default NewBlogModal;
