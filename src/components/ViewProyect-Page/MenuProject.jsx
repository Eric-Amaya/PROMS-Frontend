import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import CronogramasIcon from '@mui/icons-material/CalendarToday';
import RecursosIcon from '@mui/icons-material/GroupWork';
import ParticipantesIcon from '@mui/icons-material/People';
import RendimientoIcon from '@mui/icons-material/TrendingUp';
import DocumentosIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ButtonMenu from './ButtonMenu';

const MenuProject = ({ projectName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#0b3b62", height: '60px' }}>
      <Toolbar style={{ top: 0 }}>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Typography variant="h6" sx={{ marginRight: '50px', color: 'white' }}>
            {projectName}
          </Typography>
          <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ButtonMenu icon={TaskIcon} label="Tareas" to="/view/task" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ButtonMenu icon={CronogramasIcon} label="Cronogramas" to="/view/schedule" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ButtonMenu icon={RecursosIcon} label="Recursos" to="/view/resource" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ButtonMenu icon={ParticipantesIcon} label="Participantes" to="/view/participants"/>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ButtonMenu icon={RendimientoIcon} label="Rendimiento" to="/view/performance"/>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ButtonMenu icon={DocumentosIcon} label="Documentos" to="/view/document"/>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ButtonMenu icon={SettingsIcon} label="Configuración" to="/view/setting" />
              </MenuItem>
          </Menu>
          <IconButton
              color="inherit"
              aria-label="more"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
          </IconButton>
          <Box display="flex" flexGrow={1} justifyContent="space-between">
            <ButtonMenu icon={TaskIcon} label="Tareas" to="/view/task" />
            <ButtonMenu icon={CronogramasIcon} label="Cronogramas" to="/view/schedule" />
            <ButtonMenu icon={RecursosIcon} label="Recursos" to="/view/resource" />
            <ButtonMenu icon={ParticipantesIcon} label="Participantes" to="/view/participants" />
            <ButtonMenu icon={RendimientoIcon} label="Rendimiento" to="/view/performance" />
            <ButtonMenu icon={DocumentosIcon} label="Documentos" to="/view/document" />
            <ButtonMenu icon={SettingsIcon} label="Configuración" to="/view/setting" />
    
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuProject;
