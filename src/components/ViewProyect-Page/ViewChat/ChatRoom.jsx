import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const ChatRoom = ({ participant }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        content: newMessage,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Box>
      <Typography variant="h6">{participant.name}</Typography>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={message.content} 
              secondary={message.time} 
            />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        placeholder="Escribe un mensaje"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button 
        fullWidth 
        variant="contained" 
        onClick={handleSendMessage}
        sx={{ mt: 1 }}
      >
        Enviar
      </Button>
    </Box>
  );
};

export default ChatRoom;
