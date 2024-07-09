import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, IconButton, Box, ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/Escudo-UCN.png';
import SidebarBackground from '../assets/Fondo-UCN.png';

const drawerWidth = 280;
const collapsedWidth = 75;

const Sidebar = ({ onLogout, isCollapsed, toggleDrawer }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? collapsedWidth : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#003057',
          backgroundImage: `url(${SidebarBackground})`, 
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ width: isCollapsed ? '60%' : '60%', margin: 'auto', marginTop: "10px",marginBottom: '10px' }}>
          <img src={LogoImage} alt="Logo" style={{ width: '100%' }} />
        </div>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            margin: isCollapsed ? '8px auto' : '8px 8px 8px auto',
            color: '#fff'
          }}
        >
          {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <List sx={{ flexGrow: 1 }}>
          <ListItemButton component={Link} to="/" sx={{ backgroundColor: 'transparent', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#fff' , marginLeft: '9px'}} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Inicio" sx={{ color: '#fff' }} />}
          </ListItemButton>
          <ListItemButton onClick={onLogout} sx={{ marginTop : 'auto' ,backgroundColor: 'transparent', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: '#fff', marginLeft: '9px' }} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Cerrar Sesión" sx={{ color: '#fff' }} />}
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
