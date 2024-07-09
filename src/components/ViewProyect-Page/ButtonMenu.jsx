import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';

const ButtonMenu = ({ icon: Icon, label, to, ...props }) => {

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <IconButton 
        color="inherit"
        sx={{
          backgroundColor: 'inherit', 
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#194970',
            borderRadius: '8px'
          },
          '&:active': {
            backgroundColor: '#001f3e',
            borderRadius: '8px'
          }
        }}
        {...props}
      >
        <Icon sx={{ mr: 1 }} />
        <Typography variant="body2">{label}</Typography>
      </IconButton>
    </Link>
  );
};

export default ButtonMenu;
