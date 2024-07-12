import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

const ViewProjects = ({ projects, onSelectProject }) => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleClickOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewMore = () => {
    // Redirige a la ruta de la vista del proyecto seleccionado con el id
    navigate(`/view/${selectedCourse.id}`);
    handleClose();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Vista general de tus proyectos
      </Typography>
      
      <Grid container spacing={2}>
        {projects.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card 
              onClick={() => handleClickOpen(course)} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5', // Fondo cuando se pasa el ratón
                },
                '&:active': {
                  backgroundColor: '#e0e0e0', // Fondo cuando se mantiene presionado el botón del ratón
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">
                  {course.name}
                </Typography>
                <Typography variant='body1' color="textSecondary">
                  Fecha de inicio: {course.start_date}
                </Typography>
                <Typography variant='body1' color="textSecondary">
                  Fecha de término: {course.end_date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedCourse?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Descripción: {selectedCourse?.description}
            <br />
            Participantes: {selectedCourse?.amount_participant}
            <br />
            Fecha de inicio: {selectedCourse?.start_date}
            <br />
            Fecha de finalización: {selectedCourse?.end_date}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewMore} color="primary">
            Ver más
          </Button>
          <Button onClick={handleClose} color="error">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewProjects;
