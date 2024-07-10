import { Box, Typography, Paper } from '@mui/material';
import React from 'react';

const ViewResource = ({resource}) => {

    return (
        <Paper elevation={0} sx={{ width: 400, p: 2, maxHeight: 500, overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant='subtitle1'>Nombre</Typography>
                    <Typography variant='body2'>{resource ? resource.name : ''}</Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Typography variant='subtitle1'>Tipo</Typography>
                    <Typography variant='body2'>{resource ? resource.type : ''}</Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Typography variant='subtitle1'>Contenido</Typography>
                    <Typography variant='body2' sx={{ wordWrap: 'break-word', width: '100%' }}>
                        {resource ? resource.content : ''}
                    </Typography>
                </Box>
            </Box>
        </Paper>       
    );
};

export default ViewResource;