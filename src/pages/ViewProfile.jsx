import React, { useState } from 'react';
import { Box, TextField, Typography, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../components/ViewHome-Page/CustomButton';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import { editProfileSchema } from '../validation/editeProfile-schema';
import * as Yup from 'yup';

const ViewProfile = ({ user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [surname, setSurname] = useState(user ? user.surname : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [rut, setRut] = useState(user ? user.rut : '');
  const [password, setPassword] = useState(user ? user.password : '');
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const validationSchema = editProfileSchema;

  const handleSave = async () => {
    try {
      await validationSchema.validate({ name, surname, email, rut, password }, { abortEarly: false });
      const updatedUser = {
        ...user,
        name,
        surname,
        email,
        rut,
        password,
      };
      console.log('Guardando cambios:', updatedUser);
      // Aquí normalmente llamarías a una función onSave para guardar los cambios
      // onSave(updatedUser); // Descomenta esta línea para implementar la función onSave adecuadamente
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
      surname: setSurname,
      email: setEmail,
      rut: setRut,
      password: setPassword,
    };

    const handler = fieldHandlers[field];
    if (handler) {
      handler(value);
    }

    // Clear any existing errors for the field being edited
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <MenuProject projectName={name} />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">Perfil de Usuario</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!editMode}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              value={surname}
              onChange={(e) => handleInputChange('surname', e.target.value)}
              disabled={!editMode}
              error={!!errors.surname}
              helperText={errors.surname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!editMode}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="RUT"
              value={rut}
              onChange={(e) => handleInputChange('rut', e.target.value)}
              disabled={!editMode}
              error={!!errors.rut}
              helperText={errors.rut}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={!editMode}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
    </div>
  );
};

export default ViewProfile;
