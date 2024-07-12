import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatRoom = ({ participant, incrementUnreadCount }) => {
  const [messages, setMessages] = useState([
    { content: 'Hola, ¿cómo estás?', time: '10:00 AM', sender: 'John Doe', isCurrentUser: false },
    { content: 'Todo bien, ¿y tú?', time: '10:05 AM', sender: participant.name, isCurrentUser: true },
    { content: 'Genial, gracias por preguntar.', time: '10:10 AM', sender: 'John Doe', isCurrentUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simula la llegada de nuevos mensajes
      const newIncomingMessage = {
        content: 'Nuevo mensaje',
        time: new Date().toLocaleTimeString(),
        sender: 'John Doe',
        isCurrentUser: false
      };
      setMessages(prevMessages => [...prevMessages, newIncomingMessage]);
      incrementUnreadCount();
    }, 10000); // Llega un nuevo mensaje cada 10 segundos

    return () => clearInterval(interval);
  }, [incrementUnreadCount]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        content: newMessage,
        time: new Date().toLocaleTimeString(),
        sender: participant.name, // Agrega el nombre del remitente al mensaje
        isCurrentUser: true // Marca los mensajes del currentUser
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '95%' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
        <List>
          {messages.map((message, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                display: 'flex', 
                justifyContent: message.isCurrentUser ? 'flex-end' : 'flex-start' 
              }}
            >
              <Tooltip title={message.time} placement='bottom-start'>
                <Paper 
                  sx={{ 
                    padding: 1, 
                    marginBottom: 1, 
                    backgroundColor: message.isCurrentUser ? '#d1e7ff' : '#f5f5f5', 
                    borderRadius: 4,
                    maxWidth: '75%',
                    alignSelf: message.isCurrentUser ? 'flex-end' : 'flex-start'
                  }}
                >
                  <ListItemText 
                    primary={
                      !message.isCurrentUser && (
                        <Typography variant='body2' sx={{ fontWeight: 'bold' , wordBreak: 'break-word'}}>
                          {message.sender}
                        </Typography>
                      )
                    }
                    secondary={<Typography variant='body2' sx={{wordBreak: 'break-word'}}>{message.content}</Typography>} 
                  />
                </Paper>
              </Tooltip>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box 
        display='flex' 
        flexDirection='row' 
        alignItems='center' 
        sx={{ 
          position: 'sticky', 
          bottom: 0, 
          backgroundColor: 'white', 
          padding: 1,
          borderTop: '1px solid #ddd'
        }}
      >
        <TextField
          fullWidth
          placeholder="Escribe un mensaje"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
        />
        <Tooltip title="Enviar mensaje">
          <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ChatRoom;
