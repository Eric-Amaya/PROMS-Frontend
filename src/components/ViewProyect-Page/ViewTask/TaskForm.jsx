import React, { useState } from 'react';
import { Drawer, Box, TextField, Typography, Grid, Button, IconButton } from '@mui/material';
import CustomButton from './customButton';
import CloseIcon from '@mui/icons-material/Close'; 
import { taskFormSchema } from '../../../validation/task-form-schema';
import * as Yup from 'yup';
import EditParticipantsDialog from './EditParticipantsDialog';
import CommentsDialog from './CommentsDialog';
import CommentIcon from '@mui/icons-material/Comment';

const TaskForm = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [startDate, setStartDate] = useState(task ? task.startDate : '');
  const [endDate, setEndDate] = useState(task ? task.endDate : '');
  const [participants, setParticipants] = useState(task ? task.participants : []);
  const [resources, setResources] = useState(task ? task.resources : '');
  const [comments, setComments] = useState(task ? task.comments : []);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [errors, setErrors] = useState({});
  const [editParticipantsDialogOpen, setEditParticipantsDialogOpen] = useState(false);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ 
    id: 6, 
    name: 'Eric', 
    lastName: 'Amaya', 
    rol: 'Developer', 
    team: 'Frontend' 
  });


  const validationSchema = taskFormSchema;

  const handleSave = async () => {
    const newTask = {
      id: task ? task.id : Date.now(),
      title,
      description,
      startDate,
      endDate,
      participants,
      resources,
      comments,
    };
    try {
      await validationSchema.validate(newTask, { abortEarly: false });
      onSave(newTask);
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
      }
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleClose = () => {
    onClose(); // Cerrar el formulario sin guardar
  };

  const [projectParticipants] = useState([
    { 
      id: 1, 
      name: 'Juan', 
      lastName: 'Pérez', 
      rol: 'Developer', 
      team: 'Backend' 
    },
    { 
      id: 2, 
      name: 'María', 
      lastName: 'Gómez', 
      rol: 'Designer', 
      team: 'UI/UX' 
    },
    { 
      id: 3, 
      name: 'Carlos', 
      lastName: 'López', 
      rol: 'Product Manager', 
      team: 'Product' 
    },
    { 
      id: 4, 
      name: 'Ana', 
      lastName: 'Rodríguez', 
      rol: 'QA Engineer', 
      team: 'QA' 
    },
    { 
      id: 5, 
      name: 'Pedro', 
      lastName: 'Martínez', 
      rol: 'DevOps Engineer', 
      team: 'Infrastructure' 
    },
    {
      id: 6, 
      name: 'Eric', 
      lastName: 'Amaya', 
      rol: 'Developer', 
      team: 'Frontend' 
    }
  ]);

  const handleSaveComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleAssignToMe = () => {
    if (currentUser && !participants.find(participant => participant.id === currentUser.id)) {
      setParticipants([...participants, currentUser]);
    }
  };

  const handleContainerMouseDown = (e) => {
    e.stopPropagation(); // Detener la propagación del evento para evitar que se cierre el formulario
  };

  return (
    <Drawer anchor="right" open ModalProps={{ disableBackdropClick: true }} >
      <Box width={400} p={2} onMouseDown={handleContainerMouseDown} >
        <Box display="flex" justifyContent="space-between" alignItems="center" >
          <Typography variant="h6" style={{ marginBottom: '12px', fontFamily: 'Open Sans' }}>{task ? 'Editar Tarea' : 'Agregar Tarea'}</Typography>
          <IconButton onClick={handleClose} sx={{ marginTop: -2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => clearError('title')}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => clearError('description')}
              error={!!errors.description}
              helperText={errors.description}
              multiline 
              inputProps={{ 
                style: { overflowWrap: 'anywhere' }, 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Fecha de inicio"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Fecha de termino"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Box display='flex' flexDirection='row' alignItems='center' pb={2}>
              <Typography variant='body1' mr={2} pl={1}>Participantes</Typography>
              <Button onClick={handleAssignToMe} >Asignarme a mi</Button>
            </Box>
            <Button onClick={() => setEditParticipantsDialogOpen(true)} sx={{mb: 2}}> Agregar participantes</Button>
            {participants.map((participant) => (
              <Box key={participant.id} display="flex" alignItems="center" p={1} m={1} sx= {{bgcolor: '#e7e4e4'}}>
                <Typography variant='body2'>
                  {participant.name + ' '} 
                  {participant.lastName + ' '}
                  {'- [ ' + participant.rol + ' ] ' }
                  {'- [ ' + participant.team + ' ]' }
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label = "Recursos"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              variant="outlined"
              inputProps={{ 
                style: { overflowWrap: 'anywhere' }, 
              }}
              error={!!errors.resources}
              helperText={errors.resources}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' flexDirection='row' alignItems='center' pb={2}>
              <Typography variant="subtitle1"mr={2} pl={1}>Comentarios</Typography>
              <IconButton>
                <CommentIcon onClick={() => setCommentsDialogOpen(true)} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <CustomButton fullWidth variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
      <EditParticipantsDialog
        open={editParticipantsDialogOpen}
        onClose={() => setEditParticipantsDialogOpen(false)}
        projectParticipants={projectParticipants}
        participants={participants}
        setParticipants={setParticipants}
      />
      <CommentsDialog
        open={commentsDialogOpen}
        onClose={() => setCommentsDialogOpen(false)}
        comments={comments}
        onSaveComment={handleSaveComment}
      />
    </Drawer>
  );
};

export default TaskForm;
