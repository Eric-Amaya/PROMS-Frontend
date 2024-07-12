import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Box, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const roles = [
    'Product Owner',
    'Project Manager',
    'Scrum Master',
    'Team Leader',
    'Team member',
];


const ParticipantList = ({ participants, onRemoveParticipant, onUpdateParticipant, permitedRoles }) => {
    const [currentUserRole] = useState('Team Leader');
    const [establishedRoles, setEstablishedRoles] = useState(permitedRoles);
    
    const handleRoleChange = (participant, event) => {
      const updatedParticipant = { ...participant, role: event.target.value };
      onUpdateParticipant(updatedParticipant);
    };

    const isRoleChangeAllowed = establishedRoles.includes(currentUserRole);

    return (
      <Box
        paddingTop="12px"
        sx={{
          maxHeight: 350,
          overflowY: 'auto',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px',
          marginBottom: '16px',
        }}
      >
        <List>
          {participants.map((participant, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={participant.name} 
                secondary={participant.email} 
              />
              <Select
                value={participant.role || ''}
                onChange={(event) => handleRoleChange(participant, event)}
                displayEmpty
                sx={{ marginLeft: 'auto', marginRight: 2 }}
                disabled={!isRoleChangeAllowed}
              >
                <MenuItem value="" disabled>
                  Selecciona un rol
                </MenuItem>
                {roles.map((role, idx) => (
                  <MenuItem key={idx} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              <IconButton 
                edge="end" 
                disabled={!isRoleChangeAllowed}
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
