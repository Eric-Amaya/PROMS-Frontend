import React, { useState } from 'react';
import { TextField, List, ListItemText, ListItemButton, Box } from '@mui/material';
import CustomButton from '../ViewTask/customButton';

const SearchParticipants = ({ onAddParticipant }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredParticipants, setFilteredParticipants] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Nuevo estado para controlar la visibilidad de la lista

    const participants = [
        { name: 'Juan Perez', email: 'juan@example.com' },
        { name: 'Ana Gomez', email: 'ana@example.com' },
        { name: 'Luis Fernandez', email: 'luis@example.com' },
        { name: 'Bastian Egaña', email: 'bastian@example.com' },
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Alice Johnson', email: 'alice@example.com' },
        { name: 'Bob Brown', email: 'bob@example.com' },
        { name: 'Charlie White', email: 'charlie@example.com' },
        { name: 'David Black', email: 'david@example.com' },
        { name: 'Ella Green', email: 'ella@example.com' },
        { name: 'Frank Blue', email: 'frank@example.com' },
    ];

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
        setIsSearching(value !== ''); // Mostrar la lista solo cuando se está escribiendo en el campo de búsqueda
    };

    const handleAddParticipant = (participant) => {
        onAddParticipant(participant);
        setSearchTerm('');
        setFilteredParticipants([]);
        setIsSearching(false); // Ocultar la lista cuando se agrega un participante
    };
    

    return (
        <div>
            <Box sx={{ position: 'relative', marginBottom: isSearching ? '240px' : 0 }}> {/* Agregar margen inferior cuando se muestra la lista de búsqueda */}
                {isSearching && ( // Mostrar la lista solo cuando se está buscando
                    <Box 
                        sx={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0,
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            maxHeight: 220,
                            overflowY: 'auto',
                            zIndex: 1,
                        }}
                    >
                        <List>
                            {filteredParticipants.map((participant, index) => (
                                <ListItemButton  
                                    key={index} 
                                    onClick={() => handleAddParticipant(participant)}
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
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        label="Buscar Participante"
                        value={searchTerm}
                        onChange={handleSearch}
                        fullWidth
                        margin="normal"
                        sx={{ mr: 2 }}
                    />
                    <CustomButton
                        variant="contained"
                        onClick={() => handleAddParticipant({ name: searchTerm, email: '' })}
                        disabled={!searchTerm}
                        sx={{
                            height: 'fit-content',
                            marginTop: '16px',
                        }}
                    >
                        Agregar
                    </CustomButton>
                </Box>
            </Box>
        </div>
    );
};

export default SearchParticipants;
