import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { createTeamSchema } from '../../../validation/createTeam-dialog-schema';
import * as Yup from 'yup';

const CreateTeam = ({ onSaveTeam, team, participants }) => {
    const [name, setName] = useState(team ? team.name : '');
    const [type, setType] = useState(team ? team.type : '');
    const [selectedParticipants, setSelectedParticipants] = useState(team ? team.participants : []);
    const [errors, setErrors] = useState({});
    const validationSchema = createTeamSchema;

    const handleSave = async () => {
        const newTeam = { id: team ? team.id : Date.now(), name, type, participants: selectedParticipants };
        try {
            await validationSchema.validate(newTeam, { abortEarly: false });
            onSaveTeam(newTeam);
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
        <Box component="form" noValidate autoComplete="off" >
            <TextField
                label="Nombre del Equipo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => clearError('name')}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Tipo"
                value={type}
                onChange={(e) => setType(e.target.value)}
                onFocus={() => clearError('type')}
                error={!!errors.type}
                helperText={errors.type}
                fullWidth
                margin="normal"
                select
            >
                <MenuItem value="Desarrollo">Desarrollo</MenuItem>
                <MenuItem value="Diseño">Diseño</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
            </TextField>
            <TextField
                label="Agregar Participantes"
                select
                fullWidth
                margin="normal"
                SelectProps={{
                    multiple: true,
                    value: selectedParticipants,
                    onChange: (e) => setSelectedParticipants(e.target.value),
                    renderValue: (selected) => selected.map(p => p.name).join(', '),
                }}
            >
                {participants.map((participant, index) => (
                    <MenuItem key={index} value={participant}>
                        {participant.name} ({participant.email})
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                {team ? 'Guardar Cambios' : 'Crear Equipo'}
            </Button>
        </Box>
    );
};

export default CreateTeam;
