import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import * as Yup from 'yup';
import CustomButton from '../components/ViewHome-Page/CustomButton';
import MenuProject from '../components/ViewProyect-Page/MenuProject';

const projectFormSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  amount_participant: Yup.number().required('La cantidad de participantes es requerida'),
  description: Yup.string().required('La descripción es requerida'),
  start_date: Yup.date().required('La fecha de inicio es requerida'),
  end_date: Yup.date().required('La fecha de finalización es requerida'),
});

const ViewSettings = ({ project, onClose, onSave }) => {
  const initialProject = {
    name: 'Nombre del Proyecto de Ejemplo',
    amount_participant: 5,
    description: 'Descripción del Proyecto de Ejemplo',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
  };

  const [name, setName] = useState(initialProject.name);
  const [amountParticipant, setAmountParticipant] = useState(initialProject.amount_participant.toString());
  const [description, setDescription] = useState(initialProject.description);
  const [startDate, setStartDate] = useState(initialProject.start_date);
  const [endDate, setEndDate] = useState(initialProject.end_date);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setAmountParticipant(project.amount_participant.toString());
      setDescription(project.description);
      setStartDate(project.start_date);
      setEndDate(project.end_date);
    }
  }, [project]);

  const handleSave = async () => {
    const newProject = {
      id: project ? project.id : Date.now(),
      name,
      amount_participant: parseInt(amountParticipant),
      description,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      await projectFormSchema.validate(newProject, { abortEarly: false });
      onSave(newProject); 
      setErrors({});
      setEditMode(false);
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

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div>
      <MenuProject projectName={name} /> 
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">Configuración del proyecto</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Proyecto"
              value={editMode ? name : initialProject.name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => clearError('name')}
              error={!!errors.name}
              helperText={errors.name}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad de participantes"
              value={editMode ? amountParticipant : initialProject.amount_participant.toString()}
              onChange={(e) => setAmountParticipant(e.target.value)}
              onFocus={() => clearError('amount_participant')}
              error={!!errors.amount_participant}
              helperText={errors.amount_participant}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              value={editMode ? description : initialProject.description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => clearError('description')}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de inicio"
              value={editMode ? startDate : initialProject.start_date}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de finalización"
              value={editMode ? endDate : initialProject.end_date}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <CustomButton fullWidth variant="contained" color="primary" onClick={handleSave}>
                Guardar
              </CustomButton>
            ) : (
              <CustomButton fullWidth variant="contained" color="primary" onClick={handleEdit}>
                Editar
              </CustomButton>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ViewSettings;
