import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent, Typography } from '@mui/material';

const TaskList = ({ taskData }) => {
  return (
    <Card>
      <CardContent> 
        
        <Typography variant="h6"><strong>Tareas</strong></Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha de inicio</TableCell>
              <TableCell>Fecha de término</TableCell>
              <TableCell>Retraso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskData.map(task => (
              <TableRow key={task.id_task}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.state}</TableCell>
                <TableCell>{new Date(task.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(task.finish_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(task.finish_date) > new Date(task.task_finish_date) ? 'Sí' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TaskList;
