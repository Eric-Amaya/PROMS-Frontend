import React from 'react';
import { List, ListItemText, IconButton, ListItemButton , Box} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TeamList = ({ teams, onSelectTeam, onEditTeam, onDeleteTeam }) => {
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
                {teams.map((team, index) => (
                    <ListItemButton key={index} onClick={() => onSelectTeam(team)}>
                        <ListItemText primary={team.name} secondary={team.type} />
                        <IconButton edge="end" onClick={() => onEditTeam(team)} sx={{ marginRight: '8px' }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" onClick={() => onDeleteTeam(team)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default TeamList;
