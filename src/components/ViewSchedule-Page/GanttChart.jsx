import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { Modal, Box, TextField, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import { findTaskByProject } from '../../services/task.service';

const GanttChart = () => {
  const [data, setData] = useState([
    [
      { type: 'string', label: 'ID de la Tarea' },
      { type: 'string', label: 'Nombre de la Tarea' },
      { type: 'string', label: 'Recurso' },
      { type: 'date', label: 'Fecha de Inicio' },
      { type: 'date', label: 'Fecha de Fin' },
      { type: 'number', label: 'Duración' },
      { type: 'number', label: 'Porcentaje Completo' },
      { type: 'string', label: 'Dependencias' },
    ],
    ['1', 'Lanzar Producto SaaS', null, new Date(2024, 0, 6), new Date(2024, 2, 10), null, 0, null],
    ['2', 'Configurar servidor web', null, new Date(2024, 0, 6), new Date(2024, 0, 13), null, 50, null],
    ['3', 'Instalar Apache', 'Configurar servidor web', new Date(2024, 0, 13), new Date(2024, 0, 20), null, 50, null],
    ['4', 'Configurar firewall', 'Configurar servidor web', new Date(2024, 0, 20), new Date(2024, 0, 27), null, 50, null],
    ['5', 'Configurar balanceador de carga', 'Configurar servidor web', new Date(2024, 0, 27), new Date(2024, 1, 3), null, 50, null],
    ['6', 'Configurar puertos', 'Configurar servidor web', new Date(2024, 1, 3), new Date(2024, 1, 10), null, 50, null],
    ['7', 'Realizar pruebas', null, new Date(2024, 1, 10), new Date(2024, 1, 17), null, 0, null],
    ['8', 'Diseño del Sitio Web', null, new Date(2024, 1, 10), new Date(2024, 2, 10), null, 0, null],
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [newTask, setNewTask] = useState({
    taskId: '',
    taskName: '',
    resource: '',
    startDate: '',
    endDate: '',
    duration: '',
    percentComplete: '',
    dependencies: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = () => {
    const newTaskData = [
      newTask.taskId,
      newTask.taskName,
      newTask.resource || null,
      new Date(newTask.startDate),
      new Date(newTask.endDate),
      newTask.duration ? parseInt(newTask.duration) : null,
      newTask.percentComplete ? parseInt(newTask.percentComplete) : 0,
      newTask.dependencies || null,
    ];

    if (editingTaskIndex !== null) {
      const updatedData = data.map((task, index) => index === editingTaskIndex ? newTaskData : task);
      setData(updatedData);
    } else {
      setData([...data, newTaskData]);
    }

    setModalOpen(false);
    setEditingTaskIndex(null);
    setNewTask({
      taskId: '',
      taskName: '',
      resource: '',
      startDate: '',
      endDate: '',
      duration: '',
      percentComplete: '',
      dependencies: '',
    });
  };

  const handleTaskClick = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;

    const [selectedItem] = selection;
    const selectedTask = data[selectedItem.row + 1];

    setNewTask({
      taskId: selectedTask[0],
      taskName: selectedTask[1],
      resource: selectedTask[2] || '',
      startDate: selectedTask[3].toISOString().split('T')[0],
      endDate: selectedTask[4].toISOString().split('T')[0],
      duration: selectedTask[5] ? selectedTask[5].toString() : '',
      percentComplete: selectedTask[6].toString(),
      dependencies: selectedTask[7] || '',
    });

    setEditingTaskIndex(selectedItem.row + 1);
    setModalOpen(true);
  };

  const options = {
    height: 400,
    gantt: {
      criticalPathEnabled: false,
      criticalPathStyle: {
        stroke: '#e64a19',
        strokeWidth: 5,
      },
      arrow: {
        angle: 100,
        width: 5,
        color: 'green',
        radius: 0,
      },
    },
  };

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       // Asegúrate de que id_project esté definido y sea el correcto
  //       const response = await findTaskByProject(id_project);
  //       const formattedData = response.map(task => [
  //         task.id.toString(),
  //         task.name,
  //         task.project.name, 
  //         new Date(task.start_date),
  //         new Date(task.end_date),
  //         null, 
  //         0, 
  //         null, 
  //       ]);
  //       setData([
  //         [
  //           { type: 'string', label: 'ID de la Tarea' },
  //           { type: 'string', label: 'Nombre de la Tarea' },
  //           { type: 'string', label: 'Recurso' },
  //           { type: 'date', label: 'Fecha de Inicio' },
  //           { type: 'date', label: 'Fecha de Fin' },
  //           { type: 'number', label: 'Duración' },
  //           { type: 'number', label: 'Porcentaje Completo' },
  //           { type: 'string', label: 'Dependencias' },
  //         ],
  //         ...formattedData
  //       ]);
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   };
  //   loadData();
  // }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom marginTop={1} marginLeft={2}>
          Cronograma
        </Typography>
        <CustomButton variant="contained" color="primary" onClick={() => setModalOpen(true)} style={{ marginRight: '20px' }}>
          Añadir Tarea
        </CustomButton>
      </div>
      <Chart
        chartType="Gantt"
        width="100%"
        height="50vh"
        data={data}
        options={options}
        chartEvents={[
          {
            eventName: 'select',
            callback: handleTaskClick,
          },
        ]}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 4,
            bgcolor: 'background.paper',
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography variant="h6">{editingTaskIndex !== null ? 'Editar Tarea' : 'Añadir Nueva Tarea'}</Typography>
          <TextField
            label="ID de la Tarea"
            name="taskId"
            value={newTask.taskId}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Nombre de la Tarea"
            name="taskName"
            value={newTask.taskName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Recurso"
            name="resource"
            value={newTask.resource}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Fecha de Inicio"
            type="date"
            name="startDate"
            value={newTask.startDate}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fecha de Fin"
            type="date"
            name="endDate"
            value={newTask.endDate}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Duración"
            name="duration"
            value={newTask.duration}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Porcentaje Completo"
            name="percentComplete"
            value={newTask.percentComplete}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Dependencias"
            name="dependencies"
            value={newTask.dependencies}
            onChange={handleInputChange}
            margin="normal"
          />
          <CustomButton variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
            {editingTaskIndex !== null ? 'Guardar Cambios' : 'Añadir'}
          </CustomButton>
        </Box>
      </Modal>
    </div>
  );
};

export default GanttChart;