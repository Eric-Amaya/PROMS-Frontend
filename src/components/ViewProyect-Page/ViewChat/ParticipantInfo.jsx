import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ParticipantInfo = ({ participant, onStartChat }) => {
  return (
    <Box>
      <Typography variant="h6">{participant.name}</Typography>
      <Typography variant="body1">{participant.info}</Typography>
      <Button variant="contained" onClick={onStartChat}>
        Enviar mensaje
      </Button>
    </Box>
  );
};

export default ParticipantInfo;
