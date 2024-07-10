import React from 'react';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';

const ParticipantList = ({ projectTitle, participants, onSelectParticipant }) => {
  return (
    <>
      <Typography variant="h6">{projectTitle}</Typography>
      <List>
        {participants.map((participant) => (
          <ListItemButton key={participant.id} onClick={() => onSelectParticipant(participant)}>
            <ListItemText primary={participant.name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default ParticipantList;
