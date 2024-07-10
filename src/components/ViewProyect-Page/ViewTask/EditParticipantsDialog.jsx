import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent,DialogContentText ,DialogTitle, Button, List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EditParticipantsDialog = ({ open, onClose, projectParticipants, participants, setParticipants }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [participantToRemove, setParticipantToRemove] = useState(null);

  const handleRemoveParticipant = (participantId) => {
    setParticipants(participants.filter(participant => participant.id !== participantId));
    setConfirmOpen(false);
    setParticipantToRemove(null);
  };

  const handleRemoveAllParticipants = () => {
    setParticipants([]);
    setConfirmOpen(false);
  };

  const openConfirmDialog = (participantId) => {
    setParticipantToRemove(participantId);
    setConfirmOpen(true);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Participantes</DialogTitle>
      <DialogContent>
        <List>
          {participants.map((participant) => (
            <ListItem key={participant.id}>
              <ListItemText primary={participant.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => openConfirmDialog(participant.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="secondary" onClick={() => setConfirmOpen(true)}>
          Eliminar Todos
        </Button>
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {participantToRemove ? `¿Estás seguro de que quieres eliminar a ${projectParticipants.find(p => p.id === participantToRemove)?.name}?` : "¿Estás seguro de que quieres eliminar a todos los participantes?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={participantToRemove ? () => handleRemoveParticipant(participantToRemove) : handleRemoveAllParticipants} color="secondary">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditParticipantsDialog;
