import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import translations from '../../../traduction/es.json';
import EastIcon from '@mui/icons-material/East';

const TaskDetailsDialog = ({ open, onClose, task, taskMovements }) => {
  if (!task) return null;

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate)
      ? parsedDate.toLocaleString()
      : '';
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detalles de la Tarea</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="h6" mb={1}>Información de la Tarea</Typography>
          <Typography variant='body1' mb={1}><strong>Título</strong> {task.title}</Typography>
          <Typography variant='body1' mb={1}><strong>Descripción</strong> {task.description}</Typography>
          <Typography variant='body1' mb={1}><strong>Fecha de Inicio</strong> {formatDate(task.startDate)}</Typography>
          <Typography variant='body1' mb={1}><strong>Fecha de Término</strong> {formatDate(task.endDate)}</Typography>
          <Typography variant='body1' mb={1}><strong>Recursos</strong> {task.resources}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6">Participantes</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Equipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {task.participants.map(participant => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.lastName}</TableCell>
                  <TableCell>{participant.rol}</TableCell>
                  <TableCell>{participant.team}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box>
          <Typography variant="h6">Movimientos de la Tarea</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Fecha y Hora</TableCell>
                <TableCell>Movimiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskMovements.sort((a, b) => new Date(b.date) - new Date(a.date)).map((movement, index) => (
                <TableRow key={index}>
                  <TableCell>{movement.userName}</TableCell>
                  <TableCell>{movement.userRole}</TableCell>
                  <TableCell>{new Date(movement.date).toLocaleString()}</TableCell>
                  <TableCell sx= {{display: 'flex' ,alignItems: 'center'}}>
                    <strong> {translations.task.statuses[movement.from] ? translations.task.statuses[movement.from] : movement.from} </strong>
                    <EastIcon sx={{ml: 2, mr: 2}}/>
                    <strong> {translations.task.statuses[movement.to] ? translations.task.statuses[movement.to] : movement.to} </strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsDialog;
