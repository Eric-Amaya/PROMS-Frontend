import React, { useState, useEffect } from 'react';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import SearchParticipants from '../components/ViewProyect-Page/ViewParticipants/searchParticipants';
import ParticipantList from '../components/ViewProyect-Page/ViewParticipants/ParticipantsList';
import TeamList from '../components/ViewProyect-Page/ViewParticipants/TeamList';
import TeamDetail from '../components/ViewProyect-Page/ViewParticipants/TeamDetail';
import CreateTeam from '../components/ViewProyect-Page/ViewParticipants/CreateTeam';
import ConfirmDialog from '../components/ViewProyect-Page/ViewParticipants/ConfirmDialog';
import { Alert, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import CustomButton from '../components/ViewProyect-Page/ViewTask/customButton';
import { findParticipantsByProject } from '../services/participant.service';

const permitedRoles = [
    'Product Owner',
    'Project Manager',
];

const ViewParticipants = () => {
    const [participants, setParticipants] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);
    const [openDeleteParticipant, setOpenDeleteParticipant] = useState(false);
    const [participantToUpdate, setParticipantToUpdate] = useState(null);
    const [participantToDelete, setParticipantToDelete] = useState(null);
    const [maxParticipants, setMaxParticipants] = useState(4); // cantidad maxima de participantes
    const [alertErrorParticipant, setAlertErrorParticipant] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const handleAddParticipant = (participant) => {
        if (participants.length < maxParticipants) {
            setParticipants((prevParticipants) => [...prevParticipants, participant]);
        } else {
            setAlertMessage(`No se pueden agregar más de ${maxParticipants} participantes.`);
            setAlertErrorParticipant(true);
        }
    };

    const handleUpdateParticipant = (updatedParticipant) => {
        setParticipants((prevParticipants) => 
            prevParticipants.map((participant) => 
                participant.email === updatedParticipant.email ? updatedParticipant : participant
            )
        )
    }

    const handleRemoveParticipant = () => {
        setParticipants((prevParticipants) => 
            prevParticipants.filter((participant) => participant !== participantToDelete)
        );
        setOpenDeleteParticipant(false);
        setParticipantToDelete(null);
    };

    const handleAddTeam = (team) => {
        setTeams((prevTeams) => [...prevTeams, team]);
    };

    const handleEditTeam = (updatedTeam) => {
        setTeams((prevTeams) => 
            prevTeams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
        );
    };

    const handleDeleteTeam = () => {
        setTeams((prevTeams) => prevTeams.filter((team) => team !== teamToDelete));
        if(selectedTeam === teamToDelete) {
            setSelectedTeam(null);
        }
        setOpenDeleteDialog(false);
        setTeamToDelete(null);
    };

    const handleOpenCreateTeam = (team = null) => {
        setTeamToEdit(team);
        setIsCreateTeamOpen(true);
    };

    const handleCloseCreateTeam = () => {
        setIsCreateTeamOpen(false);
        setTeamToEdit(null);
    };

    const handleSelectTeam = (team) => {
        setSelectedTeam(team);
    };

    // useEffect(() => {
    //     if (selectedTeam && !teams.some(team => team.id === selectedTeam.id)) {
    //         setSelectedTeam(null);
    //     }
    //     const fetchParticipants = async () => {
    //         try {
    //             const participants = await findParticipantsByProject(projectId);
    //             setParticipants(participants);
    //         } catch (error) {
    //             console.error('Error fetching participants:', error);
    //         }
    //     };
    //     fetchParticipants();
    // }, [teams, selectedTeam]);

    return (
        <div>
            <MenuProject projectName={"Project Name"} />
            {alertErrorParticipant && (
                <div style={{ position: 'absolute', zIndex: 9999, top: 22, left: '50%', transform: 'translate(-50%, -42%)', width: '100%' }}>
                <Alert severity="error" onClose={() => setAlertErrorParticipant(false)}>
                    {alertMessage}
                </Alert>
                </div>
            )}
            <Grid container spacing={2} style={{ padding: '16px',paddingTop: '32px' }}>
                <Grid item xs={12} md={6}>
                    <Box padding={2}>
                        <SearchParticipants 
                            onAddParticipant={handleAddParticipant} 
                            permitedRoles={permitedRoles}
                        />
                        <Typography variant="h6" sx={{ marginTop: '10px',fontFamily: 'Open Sans' }}>
                            Participantes
                        </Typography>
                        <ParticipantList 
                            participants={participants} 
                            onRemoveParticipant={(participant) => {
                                setParticipantToDelete(participant);
                                setOpenDeleteParticipant(true);
                            }} 
                            onUpdateParticipant={ (updatedParticipant) => {
                                handleUpdateParticipant(updatedParticipant)
                            }}
                            permitedRoles={permitedRoles}
                        />
                        <CustomButton
                            variant="contained"
                            onClick={() => handleOpenCreateTeam()}
                        >
                            Crear Equipo
                        </CustomButton>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h6" sx={{ marginTop: '10px',fontFamily: 'Open Sans' }}>
                                Equipos
                            </Typography>
                            <TeamList 
                                teams={teams} 
                                onSelectTeam={handleSelectTeam} 
                                onEditTeam={handleOpenCreateTeam}
                                onDeleteTeam={(team) => {
                                    setTeamToDelete(team);
                                    setOpenDeleteDialog(true);
                                }} 
                            />
                        </Grid>
                        <Grid item>
                            <TeamDetail team={selectedTeam} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <ConfirmDialog
                open = {openDeleteParticipant}
                onClose = {() => setOpenDeleteParticipant(false)}
                onConfirm={handleRemoveParticipant}
                title="Confirmar eliminación"
                description={`¿Estás seguro de que deseas eliminar al participante ${participantToDelete ? participantToDelete.name : ''}?`}
            />                

            <Dialog open={isCreateTeamOpen} onClose={handleCloseCreateTeam} >
                <DialogTitle>{teamToEdit ? 'Editar Equipo' : 'Crear Equipo'}</DialogTitle>
                <DialogContent>
                    <CreateTeam 
                        onSaveTeam={(team) => {
                            if (teamToEdit) {
                                handleEditTeam(team);
                            } else {
                                handleAddTeam(team);
                            }
                            handleCloseCreateTeam();
                        }} 
                        team={teamToEdit} 
                        participants={participants}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateTeam} color="error">Cancelar</Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDeleteTeam}
                title="Confirmar eliminación"
                description={`¿Estás seguro de que deseas eliminar el equipo ${teamToDelete ? teamToDelete.name : ''}?`}
            />
        </div>
    );
};

export default ViewParticipants;
