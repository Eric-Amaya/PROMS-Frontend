import React from 'react';
import { Button, IconButton } from '@mui/material';

const CustomButton = ({ children,icon,  ...props }) => {
  return (
    <Button 
      {...props}
      sx={{ 
        backgroundColor: '#003162',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#0b3b62',
        },
        display: 'flex',
        alignItems: 'center',
        height: '48px',
      }}
      style={{ fontFamily: 'Open Sans' }}
      startIcon={icon ? 
        <IconButton sx={{ color: '#FFFFFF'}}>{icon}</IconButton> 
      : null}
    >
      {children}
    </Button>
  );
};

export default CustomButton;