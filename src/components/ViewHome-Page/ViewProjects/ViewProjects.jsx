import React, { useState } from 'react';
import { Typography, Card, CardContent, Grid, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ViewProjects = ({ projects, onSelectProject }) => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleClickOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>

      <Typography variant="h5" gutterBottom>
        Vista general de tus proyectos
      </Typography>
      
      <Grid container spacing={2}>
        {projects.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card onClick={() => handleClickOpen(course)} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  {course.name}
                </Typography>
                <Typography color="textSecondary">
                  Product Owner: {course.product_owner}
                </Typography>
                <Typography color="textSecondary">
                  Scrum Master: {course.scrum_master}
                </Typography>
                <Typography variant="body2">
                  {course.team}
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
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          {/* <Button onClick={() => { onSelectProject(selectedCourse); handleClose(); }} color="primary">
            Editar
          </Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewProjects;
