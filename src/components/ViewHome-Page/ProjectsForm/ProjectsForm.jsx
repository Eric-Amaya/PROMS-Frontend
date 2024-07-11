import React, { useState } from 'react';
import { Drawer, Box, TextField, Typography, Grid, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';

const projectFormSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  amount_participant: Yup.number().required('La cantidad de participantes es requerida'),
  description: Yup.string().required('La descripción es requerida'),
  start_date: Yup.date().required('La fecha de inicio es requerida'),
  end_date: Yup.date().required('La fecha de finalización es requerida'),
});

const ProjectsForm = ({ project, onClose, onSave }) => {
  const [name, setName] = useState(project ? project.name : '');
  const [amount_participant, setAmountParticipant] = useState(project ? project.amount_participant : '');
  const [description, setDescription] = useState(project ? project.description : '');
  const [startDate, setStartDate] = useState(project ? project.start_date : '');
  const [endDate, setEndDate] = useState(project ? project.end_date : '');
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    const newProject = {
      id: project ? project.id : Date.now(),
      name,
      amount_participant,
      description,
      start_date: startDate,
      end_date: endDate,
    };
    try {
      await projectFormSchema.validate(newProject, { abortEarly: false });
      onSave(newProject);
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
      }
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <Drawer anchor="right" open={true} onClose={onClose}>
      <Box width={400} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>
            {project ? 'Editar Proyecto' : 'Agregar Proyecto'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Proyecto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => clearError('name')}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad de participantes"
              value={amount_participant}
              onChange={(e) => setAmountParticipant(e.target.value)}
              onFocus={() => clearError('amount_participant')}
              error={!!errors.amount_participant}
              helperText={errors.amount_participant}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => clearError('description')}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              inputProps={{ style: { overflowWrap: 'anywhere' }}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de inicio"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de finalización"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default ProjectsForm;
