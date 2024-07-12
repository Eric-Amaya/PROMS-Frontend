import React, { useEffect, useState } from 'react';
import { Alert , Grid, Typography, Box, IconButton, Button, Dialog, DialogTitle, DialogActions} from '@mui/material';
import TaskColumn from '../components/ViewProyect-Page/ViewTask/TaskColumn';
import TaskForm from '../components/ViewProyect-Page/ViewTask/TaskForm';
import TaskDetailsDialog from '../components/ViewProyect-Page/ViewTask/TaskDetailsDialog';
import { DragDropContext } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CustomButton from '../components/ViewProyect-Page/ViewTask/customButton';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import traslations from '../traduction/es.json';
import { findTaskByProject } from '../services/task.service';
import ViewChat from './ViewChat';

const initialTasks = {
  pending: [],
  inProgress: [],
  review: [],
  completed: [],
};

const columnPermissions = {
  pending: ['Product Owner', 'Scrum Master'],
  inProgress: ['Developer', 'Scrum Master'],
  review: ['Product Owner'],
  completed: ['Product Owner'],
};

const ViewTask = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskToInfo, setSelectedTaskToInfo] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taskMovements, setTaskMovements] = useState([]); // Movimientos de las tareas
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('Scrum Master'); 
  const [alertErrorMovementTask, setAlertErrorMovementTask] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const addTask = (task) => {
    if (!task.id) {
      task.id = 'task_' + Math.random().toString(36).substr(2, 9);
    }
    setTasks((prevTasks) => ({
      ...prevTasks,
      pending: [...prevTasks.pending, task],
    }));
    closeForm();
  };

  const updateTask = (updatedTask) => {
    const columnKey = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === updatedTask.id)
    );
    setTasks((prevTasks) => ({
      ...prevTasks,
      [columnKey]: prevTasks[columnKey].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
    closeForm();
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      const { columnId } = findTaskColumn(taskToDelete.id);
      const updatedTasks = tasks[columnId].filter((task) => task.id !== taskToDelete.id);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [columnId]: updatedTasks,
      }));
      setTaskToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  // Función para encontrar la columna de una tarea basada en su ID
  const findTaskColumn = (taskId) => {
    for (const columnId in tasks) {
      const taskIndex = tasks[columnId].findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        return { columnId, taskIndex };
      }
    }
    return null;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    // Verificar si la columna de origen es la misma que la columna de destino
    if (sourceColumn === destinationColumn) {
      // Mover la tarea dentro de la misma columna
      const columnTasks = Array.from(tasks[sourceColumn]);
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [sourceColumn]: columnTasks,
      }));
    } else {
      // Mover la tarea entre columnas diferentes
      const sourceTasks = Array.from(tasks[sourceColumn]);
      const destinationTasks = Array.from(tasks[destinationColumn]);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);

      if (!columnPermissions[destinationColumn].includes(currentUserRole)) {
        setAlertMessage(`No tienes permisos para mover tareas a "${
          traslations.task.statuses[destinationColumn] ? traslations.task.statuses[destinationColumn] : destinationColumn
        }"`);
        setAlertErrorMovementTask(true);
        return;
      }

      const movement = {
        taskId: movedTask.id,
        userName: 'Usuario Actual',
        userRole: currentUserRole,
        date: new Date(),
        from: sourceColumn,
        to: destinationColumn,
      };

      // Registrar el movimiento de la tarea
      setTaskMovements((prevMovements) => [
        ...prevMovements,
        movement
      ]);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [sourceColumn]: sourceTasks,
        [destinationColumn]: destinationTasks,
      }));
    }
  };

  
  const openForm = (task = null) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedTask(null);
    setIsFormOpen(false);
  };

  const handleDeleteTask = (task) => {
    if (task) {
      setTaskToDelete(task);
      setOpenDeleteDialog(true);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    setOpenDeleteDialog(false);
  };

  const openInfoDialog = (task) => {
    setSelectedTaskToInfo(task);
    setOpenDetailsDialog(true);
  };

  const closeDetailsDialog = () => {
    setSelectedTaskToInfo(null);
    setOpenDetailsDialog(false);
  };

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const tasksData = await findTaskByProject(projectId);
  //       setTasks(tasksData);
  //     } catch (error) {
  //       console.error("Error fetching tasks by project:", error);
  //     }
  //   };
  
  //   loadData();
  // }, [projectId]); 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MenuProject projectName={"Nombre del Proyecto"} />
      {alertErrorMovementTask && (
        <div style={{ position: 'absolute', zIndex: 9999, top: 22, left: '50%', transform: 'translate(-50%, -42%)', width: '100%' }}>
          <Alert severity="error" onClose={() => setAlertErrorMovementTask(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}

      <div style={{ padding: '128px', paddingTop: '32px' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box display="flex" alignItems="center">
              <Typography variant="h5" style={{ fontFamily: 'Open Sans' }}>Nombre del Proyecto</Typography>
              <IconButton style={{ marginLeft: '8px' }}>
                <EditIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" style={{ marginBottom: '16px', fontFamily: 'Open Sans' }}>Tareas</Typography>
          <Grid container spacing={2} justifyContent="space-between">
            <TaskColumn
              columnId="pending"
              title="Pendientes"
              tasks={tasks.pending}
              onEdit={openForm}
              onDelete={handleDeleteTask}
              onDetails={openInfoDialog} // Agregado para abrir detalles
              onUpdateTasks={(newTasks) => setTasks((prevTasks) => ({ ...prevTasks, pending: newTasks }))}
            />
            <TaskColumn
              columnId="inProgress"
              title="En proceso"
              tasks={tasks.inProgress}
              onEdit={openForm}
              onDelete={handleDeleteTask}
              onDetails={openInfoDialog} // Agregado para abrir detalles
              onUpdateTasks={(newTasks) => setTasks((prevTasks) => ({ ...prevTasks, inProgress: newTasks }))}
            />
            <TaskColumn
              columnId="review"
              title="En revisión"
              tasks={tasks.review}
              onEdit={openForm}
              onDelete={handleDeleteTask}
              onDetails={openInfoDialog} // Agregado para abrir detalles
              onUpdateTasks={(newTasks) => setTasks((prevTasks) => ({ ...prevTasks, review: newTasks }))}
            />
            <TaskColumn
              columnId="completed"
              title="Completadas"
              tasks={tasks.completed}
              onEdit={openForm}
              onDelete={handleDeleteTask}
              onDetails={openInfoDialog} // Agregado para abrir detalles
              onUpdateTasks={(newTasks) => setTasks((prevTasks) => ({ ...prevTasks, completed: newTasks }))}
            />
          </Grid>
        </Box>

        <Box mt={4}>
          <CustomButton variant="contained" onClick={() => openForm()} icon={<AddIcon />} >Agregar</CustomButton>
        </Box>

        {isFormOpen && (
          <TaskForm
            task={selectedTask}
            onClose={closeForm}
            onSave={selectedTask ? updateTask : addTask}
          />
        )}

        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle variant='body1'>¿Estás seguro de que deseas eliminar {taskToDelete ? taskToDelete.title : ''}?</DialogTitle>
          <DialogActions>
            <Button onClick={handleConfirmDelete} >Confirmar</Button>
            <Button onClick={handleCancelDelete} color="error" >Cancelar</Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de detalles de la tarea */}
        <TaskDetailsDialog
          open={openInfoDialog}
          onClose={closeDetailsDialog}
          task={selectedTaskToInfo}
          taskMovements={taskMovements.filter(movement => movement.taskId === (selectedTaskToInfo ? selectedTaskToInfo.id : null))}
        />
      </div>
      <ViewChat/>
    </DragDropContext>
  );
};

export default ViewTask;
