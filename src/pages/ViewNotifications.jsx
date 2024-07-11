import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CustomButton from '../components/ViewNotification-Page/customButton';
import { findNotifications } from '../services/notification.service';

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, date: '2023-07-01', time: '10:00', title: 'Notificación 1', content: 'Contenido de la notificación 1' },
    { id: 2, date: '2023-07-01', time: '11:00', title: 'Notificación 2', content: 'Contenido de la notificación 2' },
    { id: 3, date: '2023-07-02', time: '09:00', title: 'Notificación 3', content: 'Contenido de la notificación 3' },
    { id: 4, date: '2023-07-01', time: '10:00', title: 'Notificación 4', content: 'Contenido de la notificación 4' },
    { id: 5, date: '2023-07-01', time: '11:00', title: 'Notificación 5', content: 'Contenido de la notificación 5' },
  ]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    setOpen(false);
  };

  const handleDeleteNotificationsByDate = (date) => {
    setNotifications(notifications.filter(notification => notification.date !== date));
    setOpen(false);
  };

  const handleDeleteAllNotifications = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleOpenConfirmDialog = (action, payload) => {
    setConfirmDelete({ action, payload });
    setOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpen(false);
    setConfirmDelete(null);
  };

  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {});

  // useEffect(() => {
  //   const loadNotifications = async () => {
  //     try {
  //       const response = await findNotifications();
  //       const tasksByTeamParticipant = await findTaskByTeamParticipant();
        
  //       const participantIds = tasksByTeamParticipant.map(task => task.id_participant);
        
  //       const filteredNotifications = response.filter(notification =>
  //         tasksByTeamParticipant.some(task => task.id === notification.taskId && participantIds.includes(task.id_participant))
  //       );

  //       filteredNotifications.map(notification => {
  //         notification.time = `${notification.date} ${notification.time}`;
  //         notification.content = tasksByTeamParticipant.find(task => task.id === notification.taskId).name;
  //       });

  //       setNotifications(filteredNotifications);
  //     }
  //     catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   };
  //   loadNotifications();
  // }, [groupedNotifications]); //REVISAR SI FUNCIONA Y CREAR FUNCION findTaskByTeamParticipant EN BACKEND

  return (
    <Container maxWidth="lg" sx={{p: 4}}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">Centro de notificaciones</Typography>
      </Box>
      <Box textAlign="right" mb={4}>
        <CustomButton
          variant="contained"
          icon={<ClearAllIcon />}
          onClick={() => handleOpenConfirmDialog('deleteAll')}
        >
          Eliminar todas las notificaciones
        </CustomButton>
      </Box>
      {Object.keys(groupedNotifications).map((date) => (
        <Box key={date} mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{date}</Typography>
            <CustomButton
              variant="contained"
              icon={<DeleteIcon />}
              onClick={() => handleOpenConfirmDialog('deleteByDate', date)}
            >
              Eliminar notificaciones del día
            </CustomButton>
          </Box>
          {groupedNotifications[date].map((notification) => (
            <Paper key={notification.id} elevation={3} sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle1">{notification.title}</Typography>
                  <Typography variant="body2">{notification.content}</Typography>
                  <Typography variant="caption">{notification.time}</Typography>
                </Box>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenConfirmDialog('deleteSingle', notification.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      ))}
      <Dialog
        open={open}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            ¿Está seguro de que desea eliminar {confirmDelete?.action === 'deleteAll' ? 'todas las notificaciones' : confirmDelete?.action === 'deleteByDate' ? 'las notificaciones de este día' : 'esta notificación'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (confirmDelete.action === 'deleteAll') handleDeleteAllNotifications();
              if (confirmDelete.action === 'deleteByDate') handleDeleteNotificationsByDate(confirmDelete.payload);
              if (confirmDelete.action === 'deleteSingle') handleDeleteNotification(confirmDelete.payload);
            }}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewNotifications;
