import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Container } from '@mui/material';
import StatisticsCard from '../components/ViewProyect-Page/ViewPerformance/StatisticsCard';
import TaskProgressChart from '../components/ViewProyect-Page/ViewPerformance/TaskProgressChart';
import TaskList from '../components/ViewProyect-Page/ViewPerformance/TaskList';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import ViewChat from './ViewChat';


const ViewPerformance = () => {
    const [projectData, setProjectData] = useState(null);
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        // Hardcodeado para visualización
        const projectData = {
            id_project: 1,
            name: 'Nombre del Proyecto',
            description: 'Descripción del proyecto',
            amount_participant: 10,
            start_date: '2023-01-01',
            finish_date: '2023-12-31',
        };
        const taskData = [
            {
                id_task: 1,
                id_project: 1,
                name: 'Tarea 1',
                description: 'Descripción de la tarea 1',
                state: 'completadas',
                start_date: '2023-01-01',
                finish_date: '2023-06-01',
                task_finish_date: '2023-12-31',
            },
            {
                id_task: 2,
                id_project: 1,
                name: 'Tarea 2',
                description: 'Descripción de la tarea 2',
                state: 'pendientes',
                start_date: '2023-02-01',
                finish_date: '2023-08-01',
                task_finish_date: '2023-12-31',
            },
            {
                id_task: 3,
                id_project: 1,
                name: 'Tarea 3',
                description: 'Descripción de la tarea 3',
                state: 'completadas',
                start_date: '2023-03-01',
                finish_date: '2023-09-01',
                task_finish_date: '2023-12-31',
            },
            {
                id_task: 4,
                id_project: 1,
                name: 'Tarea 4',
                description: 'Descripción de la tarea 4',
                state: 'en proceso',
                start_date: '2023-04-01',
                finish_date: '2023-10-01',
                task_finish_date: '2023-12-31',
            },
            {
                id_task: 5,
                id_project: 1,
                name: 'Tarea 5',
                description: 'Descripción de la tarea 5',
                state: 'completadas',
                start_date: '2023-05-01',
                finish_date: '2024-01-01', // Fecha de finalización posterior a la fecha de finalización del proyecto
                task_finish_date: '2023-12-31',
            },
            {
                id_task: 6,
                id_project: 1,
                name: 'Tarea 6',
                description: 'Descripción de la tarea 6',
                state: 'en revisión',
                start_date: '2023-07-01',
                finish_date: '2023-11-01',
                task_finish_date: '2023-12-31',

            }
        ];
        setProjectData(projectData);
        setTaskData(taskData);
    }, []);

    if (!projectData || !taskData) {
        return <CircularProgress />;
    }

    return (
        <div>
            <MenuProject projectName={projectData.name} />
            <Container maxWidth="xl" sx={{p:3}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Rendimiento del proyecto</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <StatisticsCard projectData={projectData} taskData={taskData} />
                    </Grid>
                    <Grid item xs={12}>
                        <TaskProgressChart taskData={taskData} />
                    </Grid>
                    <Grid item xs={12}>
                        <TaskList taskData={taskData} />
                    </Grid>
                </Grid>
            </Container>
            <ViewChat/>
        </div>
    );
};

export default ViewPerformance;
