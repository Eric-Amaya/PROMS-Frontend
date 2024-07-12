import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ViewProjects from '../components/ViewHome-Page/ViewProjects/ViewProjects';
import ProjectsForm from '../components/ViewHome-Page/ProjectsForm/ProjectsForm';
import CustomButton from '../components/ViewHome-Page/CustomButton';
import { findProjectsByParticipant } from '../services/team-participant.service';
import { findParticipantByRut } from '../services/participant.service';
import { createParticipant } from '../services/participant.service';

const Home = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [participant, setParticipant] = useState({});
  const [projects, setProjects] = useState([]);

  const handleOpenForm = (project = null) => {
    setSelectedProject(project);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedProject(null);
  };

  const handleSaveProject = (newProject) => {
    setProjects([...projects, newProject]);
    handleCloseForm();
  };

  useEffect(() => {
      const loadProjects = async () => {
        try {
          const participant = await findParticipantByRut("21345678-9");
          console.log('participant:', participant);
          const projects = await findProjectsByParticipant(participant.id);
          setProjects(projects);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

      loadProjects();
    }
    , [participant.id])

  return (
    <Container xl maxWidth='xl' sx={{pt: 2}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom marginTop={1} marginLeft={2}>
          Bienvenido a PROMS
        </Typography>
        <CustomButton variant="contained" color="primary" onClick={() => handleOpenForm()}>
          Crear proyecto
        </CustomButton>
      </div>
      <ViewProjects projects={projects} onSelectProject={handleOpenForm} />
      {openForm && (
        <ProjectsForm 
          project={selectedProject} 
          onClose={handleCloseForm} 
          onSave={handleSaveProject} 
        />
      )}
    </Container>
  );
};

export default Home;