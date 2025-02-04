import React from 'react';
import { Badge, Fab, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const ChatButton = ({ newMessagesCount, onClick }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 36,
        right: 36,
        zIndex: 1000,
      }}
    >
      <Badge badgeContent={newMessagesCount} color="error">
        <Fab sx={{
          color: '#FFFFFF',
          backgroundColor: '#0b3b62',
          '&:hover': {
            color: '#0b3b62',
          },
        }} aria-label="chat" onClick={onClick}>
          <ChatIcon />
        </Fab>
      </Badge>
    </Box>
  );
};

export default ChatButton;

