import React, { useState } from 'react';
import { Drawer, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ParticipantList from './ParticipantList';
import ParticipantInfo from './ParticipantInfo';
import ChatRoom from './ChatRoom';

const ChatWindow = ({ open, onClose, projectTitle, participants }) => {
  const [view, setView] = useState('list');
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleSelectParticipant = (participant) => {
    setSelectedParticipant(participant);
    setView('info');
  };

  const handleStartChat = () => {
    setView('chat');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedParticipant(null);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        {view !== 'list' && (
          <IconButton onClick={handleBackToList}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {view === 'list' && (
          <ParticipantList 
            projectTitle={projectTitle} 
            participants={participants} 
            onSelectParticipant={handleSelectParticipant} 
          />
        )}
        {view === 'info' && selectedParticipant && (
          <ParticipantInfo 
            participant={selectedParticipant} 
            onStartChat={handleStartChat} 
          />
        )}
        {view === 'chat' && selectedParticipant && (
          <ChatRoom participant={selectedParticipant} />
        )}
      </Box>
    </Drawer>
  );
};

export default ChatWindow;
