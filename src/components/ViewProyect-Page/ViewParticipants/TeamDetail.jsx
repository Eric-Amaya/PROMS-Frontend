import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const TeamDetail = ({ team }) => {
    if (!team) return <Typography>Selecciona un equipo para ver los detalles</Typography>;

    return (
        <Box>
            <Typography variant="h6">{team.name}</Typography>
            <Typography variant="subtitle1">Tipo: {team.type}</Typography>
            <Typography variant="h7">Participantes</Typography>
            <List>
                {team.participants.map((participant, index) => (
                    <ListItem key={index}>
                        <Box display='flex' alignItems='center'>
                            <ListItemText primary={participant.name} secondary={participant.email} />
                            <Typography ml={6}> {participant.role}</Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TeamDetail;
