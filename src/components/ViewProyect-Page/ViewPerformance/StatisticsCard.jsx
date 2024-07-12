import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatisticsCard = ({ projectData, taskData }) => {
  // Calculate statistics
  const totalTasks = taskData.length;
  const completedTasks = taskData.filter(task => task.state === 'completadas').length;
  const progressPercentage = (completedTasks / totalTasks) * 100;
  const delayedTasks = taskData.filter(task => new Date(task.finish_date) > new Date(task.task_finish_date)).length;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6"><strong>Resumen</strong></Typography>
        <Typography>Tareas totales: {totalTasks}</Typography>
        <Typography>Tareas completadas: {completedTasks}</Typography>
        <Typography>Progreso: {progressPercentage}%</Typography>
        <Typography>Tareas retrasadas: {delayedTasks}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
