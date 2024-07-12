import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import { createTeamSchema } from '../../../validation/createTeam-dialog-schema';
import * as Yup from 'yup';
import CustomButton from '../ViewTask/customButton';

const CreateTeam = ({ onSaveTeam, team, participants }) => {
    const [name, setName] = useState(team ? team.name : '');
    const [type, setType] = useState(team ? team.type : '');
    const [selectedParticipants, setSelectedParticipants] = useState(team ? team.participants : []);
    const [errors, setErrors] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
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

    const handleToggleParticipant = (participant) => {
        if (selectedParticipants.find(p => p.email === participant.email)) {
            setSelectedParticipants(selectedParticipants.filter(p => p.email !== participant.email));
        } else {
            setSelectedParticipants([...selectedParticipants, participant]);
        }
    };

    const clearError = (field) => {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[field];
          return newErrors;
        });
      };

    const isParticipantSelected = (email) => selectedParticipants.some(p => p.email === email);

    return (
        <Box component="form" noValidate autoComplete="off" minWidth= {500} >
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
            <Button
                onClick={() => setDialogOpen(true)}
                sx= {{mt: 1 , mb: 2}}
            > Agregar participantes </Button>
            <CustomButton variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                {team ? 'Guardar Cambios' : 'Crear Equipo'}
            </CustomButton>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Seleccionar Participantes</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Seleccionar</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Rol</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {participants.map((participant) => (
                                    <TableRow key={participant.email}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isParticipantSelected(participant.email)}
                                                onChange={() => handleToggleParticipant(participant)}
                                            />
                                        </TableCell>
                                        <TableCell>{participant.name}</TableCell>
                                        <TableCell>{participant.email}</TableCell>
                                        <TableCell>{participant.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CreateTeam;
