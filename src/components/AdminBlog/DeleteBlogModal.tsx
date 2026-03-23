import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPostBlogEntity } from '@/interfaces/Blog';
import { useRouter } from 'next/router';

const DeleteBlogModal = ({ blog }: { blog: IPostBlogEntity }): React.ReactNode => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const processDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blogs/admin/${blog.postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Redirige o actualiza la lista de blogs
        setOpen(false);
        router.reload();
      } else {
        console.error('Error eliminando el blog');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="error">
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" id="modal-modal-title" sx={{ mb: 2 }}>
            ¿Estás seguro de eliminar este registro?
          </Typography>
          <Box>
            <Button
              onClick={() => processDelete()}
              variant="contained"
              color="error"
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
            <Button onClick={() => handleClose()} variant="contained" color="primary" sx={{ ml: 1 }}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteBlogModal;
