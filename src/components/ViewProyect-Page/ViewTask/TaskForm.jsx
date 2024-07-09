import React, { useState } from 'react';
import { Drawer, Box, TextField, Typography, Grid, Select, MenuItem, InputLabel, InputAdornment, IconButton } from '@mui/material';
import CustomButton from './customButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close'; 
import { taskFormSchema } from '../../../validation/task-form-schema';
import * as Yup from 'yup';

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
    { id: 1, name: 'Juan' },
    { id: 2, name: 'María' },
    { id: 3, name: 'Carlos' },
    { id: 4, name: 'Ana' },
    { id: 5, name: 'Pedro' },
  ]);

  const handleParticipantChange = (e) => {
    const selectedParticipantIndex = e.target.value; //Obtener el indice
    const selectedParticipant = projectParticipants[selectedParticipantIndex-1];
    console.log(selectedParticipantIndex)
    if (selectedParticipant && !participants.find(participant => participant.id === selectedParticipant.id)) {
      setParticipants([...participants, selectedParticipant]);
    }
  };

  const handleRemoveParticipant = (participantId) => {
    setParticipants(participants.filter(participant => participant.id !== participantId));
  };

  const handleAddComment = () => {
    setShowCommentForm(true);
  };

  const handleSaveComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
      setShowCommentForm(false);
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
          <Grid item xs={12}>
            <InputLabel id="participants-label">Participantes</InputLabel>
            <Select
              fullWidth
              labelId="participants-label"
              multiple
              value={participants.map(participant => participant.id)}
              onChange={handleParticipantChange}
            >
              {projectParticipants.map((participant) => (
                <MenuItem key={participant.id} value={participant.id}>
                  {participant.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            {participants.map((participant) => (
              <Box key={participant.id} display="flex" alignItems="center">
                <Typography>{participant.name}</Typography>
                <IconButton onClick={() => handleRemoveParticipant(participant.id)}><RemoveIcon /></IconButton>
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
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h7">Comentarios</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleAddComment}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Box style={{ maxHeight: '200px', overflowY: 'scroll', padding: '16px' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {comments.map((comment, index) => (
                  <li key={index} style={{ overflowWrap: 'break-word' }}>{comment}</li>
                ))}
              </ul>
            </Box>
            {showCommentForm && (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                  style={{ marginRight: '8px' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSaveComment}>
                          <SaveIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomButton fullWidth variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default TaskForm;
