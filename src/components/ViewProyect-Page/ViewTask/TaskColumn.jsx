import React from 'react';
import { Grid, Paper, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

const TaskColumn = ({ columnId, title, tasks, onEdit, onDelete, onDetails, onUpdateTasks }) => {
  return (
    <Grid item xs={12} md={3}>
      <Typography variant="h7" style={{ fontFamily: 'Open Sans' }}>{title}</Typography>
      <Grid style={{ maxHeight: '400px', overflowX: 'auto' }}>
        <Droppable droppableId={columnId}>
          {(provided) => (
            <Paper
              ref={provided.innerRef}
              {...provided.droppableProps}
              p={2}
              style={{
                minHeight: '400px',
                backgroundColor: '#f0f0f0ce',
              }}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      mb={2}
                      p={2}
                      bgcolor="lightgrey"
                      borderRadius={1}
                    >
                      <Box>
                        <Typography mb={1}>{task.title}</Typography>
                        <Box display='flex' alignContent='center' gap={2}>
                          <Tooltip title="Editar" placement='bottom'>
                            <IconButton onClick={() => { onEdit(task) }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Información" placement='bottom'>
                            <IconButton onClick={() => { onDetails(task) }}>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar" placement='bottom'>
                            <IconButton onClick={() => { onDelete(task) }}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Paper>
          )}
        </Droppable>
      </Grid>
    </Grid>
  );
};

export default TaskColumn;
