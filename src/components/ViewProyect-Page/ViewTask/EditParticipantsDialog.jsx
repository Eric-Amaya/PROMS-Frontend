import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';

const EditParticipantsDialog = ({ open, onClose, projectParticipants, participants, setParticipants }) => {

  const handleToggleParticipant = (participant) => {
    if (participants.find(p => p.id === participant.id)) {
      setParticipants(participants.filter(p => p.id !== participant.id));
    } else {
      setParticipants([...participants, participant]);
    }
  };

  const isParticipantSelected = (id) => participants.some(p => p.id === id);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Participantes</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seleccionar</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Equipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isParticipantSelected(participant.id)}
                      onChange={() => handleToggleParticipant(participant)}
                    />
                  </TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.lastName}</TableCell>
                  <TableCell>{participant.rol}</TableCell>
                  <TableCell>{participant.team}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditParticipantsDialog;
