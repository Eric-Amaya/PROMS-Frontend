import React, { useEffect, useState, useRef, useEffect } from 'react';
import { TextField, List, ListItemText, ListItemButton, Box } from '@mui/material';
import CustomButton from '../ViewTask/customButton';
import { findAllParticipants } from '../../../services/participant.service';

const SearchParticipants = ({ onAddParticipant, permitedRoles }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredParticipants, setFilteredParticipants] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Nuevo estado para controlar la visibilidad de la lista
    const [participants, setParticipants] = useState([]);

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        setFilteredParticipants(
            participants.filter(
                (participant) =>
                    participant.name.toLowerCase().includes(value.toLowerCase()) ||
                    participant.email.toLowerCase().includes(value.toLowerCase())
            )
        );
        setIsSearching(value !== '' || selectedParticipant !== null); // Mostrar la lista si hay término de búsqueda o un participante seleccionado
    };

    const handleParticipantSelect = (participant) => {
        setSelectedParticipant(participant);
        setSearchTerm(participant.name);
        setIsSearching(false); 
        setIsSelectedInput(false);
    };

    const handleAddParticipant = () => {
        if (selectedParticipant) {
            onAddParticipant(selectedParticipant);
            setSearchTerm('');
            setFilteredParticipants([]);
            setSelectedParticipant(null);
            setIsSelectedInput(false);
        }
    };

    const handleInputOnFocus = () => {
        setIsSearching(true);
        setIsSelectedInput(true); // Mostrar la lista al hacer clic en el input
    };
    useEffect(() => {
        findAllParticipants().then((data) => {
          const participants = data.map(participant => ({
            name: participant.name,
            lastName: participant.last_name,
            email: participant.email
          }));
          // Asumiendo que tienes un estado para almacenar los participantes, por ejemplo, setParticipants
          setParticipants(participants);
        }).catch((error) => {
          console.error('Error fetching participants:', error);
        });
      }, [searchTerm]); 

    return (
        <div>
            <Box sx={{ position: 'relative', zIndex: 9999 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        label="Seleccione un participante"
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={handleInputOnFocus}
                        fullWidth
                        margin="normal"
                        sx={{ mr: 2 }}
                    />
                    <CustomButton
                        variant="contained"
                        onClick={handleAddParticipant}
                        disabled={!selectedParticipant || !isRoleChangeAllowed}
                        sx={{
                            height: 'fit-content',
                            marginTop: '16px',
                        }}
                    >
                        Agregar
                    </CustomButton>
                </Box>
                { (isSearching || isSelectedInput) && (
                    <Box 
                        ref={listContainerRef}
                        sx={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0,
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            height: isSelectedInput ? 'auto' : 230, // Altura automática si se selecciona el input
                            maxHeight: 230,
                            overflowY: 'auto',
                            zIndex: 1,
                        }}
                    >
                        <List>
                            {(filteredParticipants.length > 0 ? filteredParticipants : participants).map((participant, index) => (
                                <ListItemButton  
                                    key={index} 
                                    onClick={() => handleParticipantSelect(participant)}
                                >
                                    <ListItemText 
                                        primary={participant.name} 
                                        secondary={participant.email} 
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default SearchParticipants;
