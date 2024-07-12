import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, Menu, MenuItem, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

const CustomToolbar = ({ pageImg, color, userName, userImage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(5);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    window.location.href= 'https://management-system-frontend-woad.vercel.app/login'
    console.log('Cerrando sesión...');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: color }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Box component="img" src={pageImg} alt="Logo" sx={{ height: '48px' }} />
          </IconButton>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              {userName}
            </Typography>
            <Avatar alt={userName} src={userImage} />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/view/profile" onClick={handleMenuClose}>
              <IconButton color="inherit">
                <AccountCircleIcon sx={{ marginRight: 1 }} />
              </IconButton>
              Perfil
            </MenuItem>
            <MenuItem component= {Link} to="/notifications" onClick={handleMenuClose}>
              <IconButton color="inherit" sx={{ marginRight: 1 }} >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              Notificaciones
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <IconButton color="inherit">
                <LogoutIcon sx={{ marginRight: 1 }} />
              </IconButton>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomToolbar;
