import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setOpen((currentValue) => !currentValue);
    }, 4 * 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  const handleClick = () => {
    window.open('https://wa.me/56974999596', '_blank');
  };

  return (
    <Tooltip open={open} title="¿Tienes una consulta urgente?" placement="top">
      <Fab
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#25D366',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#128C7E',
          },
        }}
        onClick={handleClick}
        aria-label="whatsapp"
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;
