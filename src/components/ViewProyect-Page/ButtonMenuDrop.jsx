import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';

const ButtonMenuDrop = ({ icon: Icon, label, to, ...props }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <IconButton 
        color="default"
        sx={{
          color: "#194970",
          backgroundColor: 'primary', 
          borderRadius: '2px',
          '&:hover': {
            color: '#FFF',
          },
          '&:active': {
            color: '#FFFFF'
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

export default ButtonMenuDrop;