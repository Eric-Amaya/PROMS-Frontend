import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ParticipantList = ({ participants, onRemoveParticipant }) => {

    return (
        <Box paddingTop="12px" 
            sx={{ 
                maxHeight: 350, 
                overflowY: 'auto', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)', 
                borderRadius: '8px', 
                padding: '16px', 
                marginTop: '16px',
                marginBottom: '16px'
            }}
        >
            <List>
                {participants.map((participant, index) => (
                    <ListItem key={index}>
                        <ListItemText 
                            primary={participant.name} 
                            secondary={participant.email} 
                        />
                        <IconButton 
                            edge="end" 
                            onClick={() => onRemoveParticipant(participant)} 
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ParticipantList;
