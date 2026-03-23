import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ClpModel } from "@/lib/formater";

import {
  TextField, MenuItem, Select, InputLabel, FormControl, Button,
  SelectChangeEvent, Grid2,
  Typography,
} from '@mui/material';
import { ICitasEntity } from '@/interfaces/Citas';
import { GetServerSideProps } from 'next';

export const AgendarConsulta = () => {
  const initialFormData = {
    tipoConsulta: '',
    nombre: '',
    telefono: '',
    correo: '',
    fecha: dayjs().add(1, 'day').format('DD-MM-YYYY'),
    hora: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const [fechasOcupadas, setFechasOcupadas] = useState<string[]>([]);

  async function fetchFechasOcupadas() {
    try {
      const response = await fetch('/api/consultas');
      const data: ICitasEntity[] = await response.json();
      setFechasOcupadas(data.map(({ fecha }) => fecha).filter(a => a));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFechasOcupadas();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDate = (newValue: Dayjs | null) => {
    if (newValue) {
      setFormData({ ...formData, fecha: newValue.format('DD-MM-YYYY'), hora: '' });
    }
  };

  const [nameError, setNameError] = useState(false);
  const InputNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
    handleChange(event);
  };

  const [phoneError, setPhoneError] = useState(false);
  const InputPhoneHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.validity.valid) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
    handleChange(event);
  };

  const [emailError, setEmailError] = useState(false);
  const inputEmailHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    handleChange(event);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (form.checkValidity()) {
      const finalData = {
        ...formData,
        fecha: `${formData.fecha} ${formData.hora}`,
      };

      console.log('Formulario válido', finalData);
      try {
        const response = await fetch('/api/consultas', {
          method: 'POST',
          body: JSON.stringify(finalData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const { url } = await response.json();
          if (url) {
            window.open(url, '_blank'); // Abre la URL en una nueva pestaña
            setFormData(initialFormData);
            fetchFechasOcupadas()
          }
        } else {
          console.error('Error en la respuesta del servidor');
        }
      } catch (error: unknown) {
        console.error(error);
      }
    } else {
      console.log('Formulario no válido');
    }
  };

  const generateHourOptions = () => {
    const hours = [];
    const startHour = dayjs().hour(12).minute(0);
    const endHour = dayjs().hour(20).minute(0);

    let currentHour = startHour;
    const formattedDate = formData.fecha;
    const occupiedHours = fechasOcupadas
      .filter(f => f.startsWith(formattedDate))
      .map(f => f.split(' ')[1]);

    while (currentHour.isBefore(endHour) || currentHour.isSame(endHour)) {
      const hourString = currentHour.format('HH:mm');

      if (!occupiedHours.includes(hourString)) {
        hours.push(hourString);
      }
      currentHour = currentHour.add(30, 'minute');
    }

    return hours;
  };

  // Validación para solo permitir fechas de lunes a viernes
  const isWeekday = (date: Dayjs) => date.day() !== 0 && date.day() !== 6;

  return (
    <section className="service-area position-relative light-bg pt-120 pb-130">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-75 wow fadeInUp">
              <span className="sub-title">Agenda</span>
              <h2>Tu consulta</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="content">
              <form onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ paddingTop: 2 }} id="tipoConsulta-label">Tipo de Consulta</InputLabel>
                      <Select
                        required
                        sx={{ marginTop: '16px' }}
                        labelId="tipoConsulta-label"
                        id="tipoConsulta"
                        name="tipoConsulta"
                        value={formData.tipoConsulta}
                        label="Tipo de Consulta"
                        onChange={handleChange}
                        placeholder='selecciona un tipo'
                      >
                        <MenuItem value="familiar">Derecho de Familia</MenuItem>
                        <MenuItem value="penal">Derecho Penal</MenuItem>
                        <MenuItem value="civil">Derecho Civil</MenuItem>
                        <MenuItem value="laboral">Derecho Laboral</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={6} >
                    <TextField
                      required
                      fullWidth
                      id="nombre"
                      name="nombre"
                      label="Nombre"
                      value={formData.nombre}
                      onChange={InputNameHandle}
                      margin="normal"
                      error={nameError}
                      helperText={nameError ? 'Ingresa un nombre válido' : ''}
                      inputProps={{
                        pattern: '[A-Za-z ]+',
                      }}
                    />
                  </Grid2>

                  <Grid2 size={6} >
                    <TextField
                      required
                      fullWidth
                      id="telefono"
                      name="telefono"
                      label='Teléfono'
                      value={formData.telefono}
                      onChange={InputPhoneHandle}
                      margin='normal'
                      error={phoneError}
                      helperText={phoneError ? 'Ingresa un numero válido' : ''}
                      inputProps={{
                        pattern: '[0-9]*',
                        maxLength: 9,
                      }}
                    />
                  </Grid2>

                  <Grid2 size={6} >
                    <TextField
                      required
                      fullWidth
                      id="correo"
                      name="correo"
                      type="email"
                      label="Correo"
                      value={formData.correo}
                      onChange={inputEmailHandle}
                      margin="normal"
                      error={emailError}
                      helperText={emailError ? 'Ingresa una dirección de correo válida' : ''}
                      inputProps={{
                        type: 'email',
                      }}
                    />
                  </Grid2>

                  <Grid2 size={6} >
                    <FormControl fullWidth margin="normal">
                      <MobileDatePicker
                        views={['year', 'month', 'day']}
                        label="Fecha"
                        minDate={dayjs().add(1, 'day')}
                        value={dayjs(formData.fecha, 'DD-MM-YYYY')}
                        onChange={handleDate}
                        shouldDisableDate={(date) => !isWeekday(date)}
                      />
                    </FormControl>
                  </Grid2>

                  <Grid2 size={6} >
                    {formData.fecha && (
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="hora-label">Hora</InputLabel>
                        <Select
                          required
                          labelId="hora-label"
                          id="hora"
                          name="hora"
                          value={formData.hora}
                          label="Hora"
                          onChange={handleChange}
                        >
                          {generateHourOptions().map((time) => (
                            <MenuItem key={time} value={time}>{time}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Grid2>
                  <Grid2 size={12} sx={{ marginY: 4 }} textAlign='center'>
                    <Typography variant='h3' color='textSecondary'>
                      {`Precio consulta: ${new ClpModel(formData.tipoConsulta === 'laboral' ? 0 : (formData.tipoConsulta === 'penal' ? 40000 : 30000)).formattedWithSign}`}
                    </Typography>
                  </Grid2>

                  <Grid2 size={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                      Agendar
                    </Button>
                  </Grid2>
                </Grid2>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AgendarConsulta;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || null;
  return {
    props: {
      isLoggedIn: !!token,
    },
  };
};
