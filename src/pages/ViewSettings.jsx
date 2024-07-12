import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import * as Yup from 'yup';
import CustomButton from '../components/ViewHome-Page/CustomButton';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import ViewChat from './ViewChat';

const projectFormSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  amount_participant: Yup.number().required('La cantidad de participantes es requerida'),
  description: Yup.string().required('La descripción es requerida'),
  start_date: Yup.date().required('La fecha de inicio es requerida'),
  end_date: Yup.date().required('La fecha de finalización es requerida'),
});

const ViewSettings = ({ project, onClose, onSave }) => {
  const initialProjectState = {
    name: 'Nombre del Proyecto de Ejemplo',
    amount_participant: 5,
    description: 'Descripción del Proyecto de Ejemplo',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
  };

  const [projectData, setProjectData] = useState(initialProjectState);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (project) {
      setProjectData(project);
    }
  }, [project]);

  const handleSave = async () => {
    try {
      await projectFormSchema.validate(projectData, { abortEarly: false });
      onSave(projectData); 
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

  const handleChange = (field, value) => {
    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      [field]: value,
    }));
    clearError(field);
  };

  return (
    <div>
      <MenuProject projectName={projectData.name} /> 
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">Configuración del proyecto</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Proyecto"
              value={editMode ? projectData.name : initialProjectState.name}
              onChange={(e) => handleChange('name', e.target.value)}
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
              value={editMode ? projectData.amount_participant : initialProjectState.amount_participant.toString()}
              onChange={(e) => handleChange('amount_participant', e.target.value)}
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
              value={editMode ? projectData.description : initialProjectState.description}
              onChange={(e) => handleChange('description', e.target.value)}
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
              value={editMode ? projectData.start_date : initialProjectState.start_date}
              onChange={(e) => handleChange('start_date', e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de finalización"
              value={editMode ? projectData.end_date : initialProjectState.end_date}
              onChange={(e) => handleChange('end_date', e.target.value)}
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
      <ViewChat/>
    </div>
  );
};

export default ViewSettings;
