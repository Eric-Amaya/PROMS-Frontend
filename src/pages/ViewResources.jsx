import React, { useState } from 'react';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import { Box, Paper, TableContainer, Typography, Grid, Table, TableHead, TableRow, TableCell, TextField, MenuItem } from '@mui/material';

const ViewResources = () => {
    const [optionsType, setOptionsType] = useState([
        {value: 'Dinero', label: 'Dinero'},
        {value: 'Material', label: 'Material'},
    ]);

    return (
        <div>
            <MenuProject projectName={"Project Name"} />
            <Box sx={{
                display: 'flex',
                alignItems: 'center', 
                padding: 2,
            }}
            >
                <Grid sx={{ display: 'flex', alignContent: 'flex-start' ,flexGrow: 1 , p: 2}} container spacing={12}>
                    <Grid item xl sx={{width: 100}}>
                        <Typography variant='h6' sx={{mb: 2}}>
                            Asignar recursos
                        </Typography>
                        <Paper elevation={2} sx={{display: 'flex', flexDirection: 'column', gap: 4, p: 2}}>
                            <Box sx= {{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                <TextField label="Nombre" variant="standard"  sx= {{widht: 400, mr: 10}}/>
                                <TextField select label="Tipo" variant="standard" helperText="Indique el tipo de recurso" sx={{width: 250}}>
                                    {optionsType.map((option) => (
                                        <MenuItem key={option.value} value= {option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}                               
                                </TextField>
                            </Box>
                            <TextField multiline label="Contenido" variant="outlined" rows={6} sx={{maxHeight: 200}} />
                        </Paper>
                    </Grid>
                    <Grid item xl>
                        <TableContainer component= {Paper} elevation={2} sx={{ height: 400 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default ViewResources;