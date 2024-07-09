import React, { useState } from 'react';
import { Button } from '@mui/material';
import ViewProjects from '../components/ViewHome-Page/ViewProjects/ViewProjects';
import ProjectsForm from '../components/ViewHome-Page/ProjectsForm/ProjectsForm';

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

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
        Crear proyecto
      </Button>
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
