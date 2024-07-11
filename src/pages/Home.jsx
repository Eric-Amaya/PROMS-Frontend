import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ViewProjects from '../components/ViewHome-Page/ViewProjects/ViewProjects';
import ProjectsForm from '../components/ViewHome-Page/ProjectsForm/ProjectsForm';
import CustomButton from '../components/ViewHome-Page/CustomButton';
import { findProjectByIdParticipant } from '../services/project.service';

const Home = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Proyecto 1', team: 'Equipo 1', product_owner: 'Eric Amaya', scrum_master: 'Camilo Clift', description: 'Proyecto de desarrollo de software', amount_participant: 5, start_date: '01-04-2024', end_date: '25-05-2024' },
    { id: 2, name: 'Proyecto 2', team: 'Equipo 2', product_owner: 'Eric Amaya', scrum_master: 'Camilo Clift', description: 'Proyecto de desarrollo de software', amount_participant: 5, start_date: '02-04-2024', end_date: '26-05-2024' },
    { id: 3, name: 'Proyecto 3', team: 'Equipo 3', product_owner: 'Eric Amaya', scrum_master: 'Camilo Clift', description: 'Proyecto de desarrollo de software', amount_participant: 5, start_date: '03-04-2024', end_date: '27-05-2024' },
    { id: 4, name: 'Proyecto 4', team: 'Equipo 4', product_owner: 'Eric Amaya', scrum_master: 'Camilo Clift', description: 'Proyecto de desarrollo de software', amount_participant: 5, start_date: '04-04-2024', end_date: '28-05-2024' },
    { id: 5, name: 'Proyecto 5', team: 'Equipo 5', product_owner: 'Eric Amaya', scrum_master: 'Camilo Clift', description: 'Proyecto de desarrollo de software', amount_participant: 5, start_date: '05-04-2024', end_date: '29-05-2024' },
  ]);

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

  // useEffect(() => {
  //   const loadProjects = async () => {
  //     try {
  //       const projects = await findProjectByIdParticipant(id);
  //       setProjects(projects);
  //     }catch (error) {
  //       console.error('Error fetching projects:', error);
  //     }
  //   };

  //   loadProjects();
  // }, [projects]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom marginTop={1} marginLeft={2}>
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
    </div>
  );
};

export default Home;
