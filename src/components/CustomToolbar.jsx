import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomToolbar = ({ pageImg, color, userName, userImage}) => {

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: color,
      }}
    >
      <Toolbar>
        <Link to= "/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <Box
              component= "img"
              src = {pageImg}
              alt = "Logo"
              sx={{ height: '48px' }}
            >    
            </Box>
            </IconButton>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Link to= "/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton color="inherit" >
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                    {userName}
                </Typography>
                <Avatar alt= {userName} src= {userImage} />
            </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default CustomToolbar;
