import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskProgressChart = ({ taskData }) => {
  // Filtrar y contar tareas por estado
  const completedTasks = taskData.filter(task => task.state === 'completadas').length;
  const pendingTasks = taskData.filter(task => task.state === 'pendientes').length;
  const inProgressTasks = taskData.filter(task => task.state === 'en proceso').length;
  const inReviewTasks = taskData.filter(task => task.state === 'en revisión').length;

  // Ejemplo de datos para tareas completadas con y sin retraso
  const delayedCompletedTasks = taskData.filter(task => task.state === 'completadas' && new Date(task.finish_date) > new Date(task.task_finish_date)).length;
  const onTimeCompletedTasks = completedTasks - delayedCompletedTasks;

  // Configuración de datos para los gráficos
  const dataCompleted = {
    labels: ['Con Retraso', 'Sin Retraso'],
    datasets: [
      {
        data: [delayedCompletedTasks, onTimeCompletedTasks],
        backgroundColor: ['#FF6384', '#4BC0C0'],
      },
    ],
  };

  const dataStates = {
    labels: ['Pendientes', 'Completadas', 'En Proceso', 'En Revisión'],
    datasets: [
      {
        data: [pendingTasks, completedTasks, inProgressTasks, inReviewTasks],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#36A2EB'],
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ width: '90%', maxWidth: '1200px', border: 'none', boxShadow: 'none' }}>
        <CardContent>
          <Typography variant="h6" align="center" sx={{ textDecoration: 'underline' }}>
            <strong>Progreso de tareas</strong>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" align="center" style={{ marginTop: 10 }}>
                Estado de las tareas
              </Typography>
              <div style={{ width: '100%', height: '350px', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie data={dataStates} />
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" align="center" style={{ marginTop: 10 }}>
                Tareas completadas
              </Typography>
              <div style={{ width: '100%', height: '350px', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie data={dataCompleted} />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskProgressChart;
