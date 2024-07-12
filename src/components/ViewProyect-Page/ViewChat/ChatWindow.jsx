import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ChatRoom from './ChatRoom';

const ChatWindow = ({ open, onClose, projectTitle, incrementUnreadCount }) => {
  const [currentUser] = useState({
    id: 3,
    name: 'Eric Amaya',
    email: 'ericamaya@test.com'
  });

  return (
    open && (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 80,
          width: 400,
          height: 600,
          zIndex: 1001,
          boxShadow: 3,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderStyle: 'solid',
          borderColor: '#0b3b62',
          scrollBehavior: 'smooth'
        }}
      >
        <Box
          position='sticky'
          top={0}
          sx={{
            backgroundColor: '#0b3b62', // Define tu color aquí
            color: 'white',
            p: 1,
            borderRadius: '10px 10px 0 0', // Border radius solo en la parte superior
            zIndex: 1
          }}
        >
          <Typography variant="body1" ml={1}>Chat general {'| ' + projectTitle}</Typography>
        </Box>
        <ChatRoom participant={currentUser} incrementUnreadCount={incrementUnreadCount} />
      </Paper>
    )
  );
};

export default ChatWindow;
