import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import * as Yup from 'yup';
import CustomButton from '../components/ViewHome-Page/CustomButton';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import ViewChat from './ViewChat';
import { editSettingSchema } from '../validation/editeSetting-schema';

const ViewSettings = ({ project }) => {
  const [name , setName] = useState(project ? project.name : '');
  const [amount_participant, setAmountParticipant] = useState(project ? project.amount_participant : '');
  const [description, setDescription] = useState(project ? project.description : '');
  const [start_date, setStartDate] = useState(project ? project.start_date : '');
  const [end_date, setEndDate] = useState(project ? project.end_date : '');
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const validationSchema = editSettingSchema;
 

  const handleSave = async () => {
    try {
      await validationSchema.validate({ name, amount_participant, description, start_date, end_date }, { abortEarly: false });
      const updatedProject = {
        ...project,
        name,
        amount_participant,
        description,
        start_date,
        end_date,
      };
      console.log('Guardando cambios:', updatedProject);
      // Aquí normalmente llamarías a una función onSave para guardar los cambios
      // onSave(updatedProject); // Descomenta esta línea para implementar la función onSave adecuadamente
      setEditMode(false); // Desactivar el modo de edición después de guardar
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
  const handleInputChange = (field, value) => {
    const fieldHandlers = {
      name: setName,
      amount_participant: setAmountParticipant,
      description: setDescription,
      start_date: setStartDate,
      end_date: setEndDate,
    };
    const handler = fieldHandlers[field];
    if (handler) {
      handler(value);
    }
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
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
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!editMode}
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
              onChange={(e) => handleInputChange('amount_participant', e.target.value)}
              error={!!errors.amount_participant}
              helperText={errors.amount_participant}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              value={description}
              onChange={(e) => handleInputChange('description', e.target.value)}
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
              value={start_date}
              onChange={(e) => handleInputChange('start_date', e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de finalización"
              value={end_date}
              onChange={(e) => handleInputChange('end_date', e.target.value)}
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
              <CustomButton fullWidth variant="contained" color="primary" onClick={() => setEditMode(true)}>
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
