import React, { useState, useRef, useEffect } from 'react';
import { TextField, List, ListItemText, ListItemButton, Box } from '@mui/material';
import CustomButton from '../ViewTask/customButton';

const SearchParticipants = ({ onAddParticipant, permitedRoles }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredParticipants, setFilteredParticipants] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [currentUserRole] = useState('Product Owner');
    const [establishedRoles, setEstablishedRoles] = useState(permitedRoles);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [isSelectedInput, setIsSelectedInput] = useState(false);
    const listContainerRef = useRef(null);

    const isRoleChangeAllowed = establishedRoles.includes(currentUserRole);

    const participants = [
        { name: 'Juan Perez', email: 'juan@example.com', role: '' },
        { name: 'Ana Gomez', email: 'ana@example.com', role: ''  },
        { name: 'Luis Fernandez', email: 'luis@example.com', role: ''  },
        { name: 'Bastian Egaña', email: 'bastian@example.com', role: ''  },
        { name: 'John Doe', email: 'john@example.com' , role: '' },
        { name: 'Jane Smith', email: 'jane@example.com', role: ''  },
        { name: 'Alice Johnson', email: 'alice@example.com' , role: '' },
        { name: 'Bob Brown', email: 'bob@example.com' , role: '' },
        { name: 'Charlie White', email: 'charlie@example.com', role: ''  },
        { name: 'David Black', email: 'david@example.com' , role: '' },
        { name: 'Ella Green', email: 'ella@example.com' , role: '' },
        { name: 'Frank Blue', email: 'frank@example.com' , role: '' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (listContainerRef.current && !listContainerRef.current.contains(event.target)) {
                setIsSearching(false);
                setIsSelectedInput(false);
                setSelectedParticipant(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
