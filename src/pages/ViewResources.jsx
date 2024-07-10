import React, { useState } from 'react';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import { Box, Paper, TableContainer, Typography, Grid, Table, TableHead, TableRow, TableCell, TextField, Dialog, DialogTitle, TableBody, IconButton, DialogContent, DialogActions, Button } from '@mui/material';
import CustomButton from '../components/ViewProyect-Page/ViewResources/customButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {Delete as DeleteIcon} from '@mui/icons-material';
import EditResource from '../components/ViewProyect-Page/ViewResources/EditResource';
import InfoIcon from '@mui/icons-material/Info';
import ViewResource from '../components/ViewProyect-Page/ViewResources/ViewResource';
import { resourceFormSchema } from '../validation/resource-form-schema';
import * as Yup from 'yup';

const ViewResources = () => {
    const [resources, setResources] = useState([]);
    const [resourceName, setResourceName] = useState('');
    const [resourceType, setResourceType] = useState('');
    const [resourceContent, setResourceContent] = useState('');
    const [isEditResource, setIsEditResource] = useState(false)
    const [isViewResource, setIsViewResource] = useState(false);
    const [resourceToEdit, setResourceToEdit] = useState(null);
    const [resourceToView, setResourceToView] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const validationSchema = resourceFormSchema;

    const handleAddResource = async () => {
        const resource = {
            name: resourceName,
            type: resourceType,
            content: resourceContent,
        }; 
        try{
            await validationSchema.validate(resource, { abortEarly: false});
            setResourceName('');
            setResourceType('');
            setResourceContent('');
            setResources((prevResources) => [...prevResources, resource]);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                  validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error(error);
            }
        }
    }

    const handleEditResource = (editedResource) => {
        setResources ((prevResources) => 
            prevResources.map((resource) => (resource.name === editedResource.name ? editedResource: resource))
        );
    }

    const handleDeleteResource = (name) => {
        setResources(resources.filter(res => res.name !== name));
    }

    const filteredResources = resources.filter((res) =>
        (searchTerm === '' || res.name.toLowerCase().includes(searchTerm.toLowerCase())
        || res.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleOpenViewDetails = (detailResource) => {
        setResourceToView(detailResource);
        setIsViewResource(true);
    }

    const handleCloseViewDetails = () => {
        setResourceToView(null);
        setIsViewResource(false);
    }

    const handleOpenEditResource = (resource) => {
        setResourceToEdit(resource);
        setIsEditResource(true);
    }

    const handleCloseEditResource = () => {
        setResourceToEdit(null);
        setIsEditResource(false);
    }

    const clearError = (field) => {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[field];
          return newErrors;
        });
    };

    return (
        <div>
            <MenuProject projectName={"Project Name"} />
            <Box sx={{
                padding: 2,
            }}
            >
                <Grid alignItems="flex-start" justifyContent="space-between" sx={{ flexGrow: 1 , p: 2}} container spacing={6}>
                    <Grid item xs>
                        <Typography variant='h6' sx={{mb: 2}}>
                            Asignar recursos
                        </Typography>
                        <Paper component="form" elevation={2} sx={{display: 'flex', flexDirection: 'column', gap: 4, p: 2}}>
                            <Box sx= {{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                <TextField 
                                    label="Nombre" 
                                    variant="standard"  
                                    sx= {{widht: 250}}
                                    value= {resourceName}
                                    onChange={(e) => setResourceName(e.target.value)}
                                    onFocus={() => clearError('name')}
                                    error= {!!errors.name}
                                    helperText={errors.name}
                                />
                                <TextField 
                                    label="Tipo" 
                                    variant="standard"  
                                    sx={{width: 250, ml: 10}}
                                    value= {resourceType}
                                    onChange={(e) => setResourceType(e.target.value)}
                                    onFocus={() => clearError('type')}
                                    error= {!!errors.type}
                                    helperText= {errors.type ? errors.type : "Indique el tipo de recurso"} 
                                />
                            </Box>
                            <TextField 
                                multiline 
                                label="Contenido" 
                                variant="outlined" 
                                rows={6} 
                                sx={{maxHeight: 200}} 
                                value= {resourceContent}
                                onChange={(e) => setResourceContent(e.target.value)}
                                onFocus={() => clearError('content')}
                                error= {!!errors.content}
                                helperText= {errors.content }
                            />
                        </Paper>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
                            <CustomButton variant="contained" onClick= {handleAddResource} icon = {<AddIcon />}>Agregar</CustomButton>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box 
                            sx = {{
                                justifyContent: 'flex-start', 
                                alignItems: 'center', 
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2 , fontFamily: 'Open Sans'}}>
                                    <TextField
                                        label="Buscar por nombre o tipo"
                                        variant="outlined"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {(filteredResources.length === 0 ) && (
                                        <Typography variant= 'body1' sx={{marginTop: '24px'}}> No se encontraron coincidencias </Typography>
                                    )}
                                </Box>
                            </Box>
                            <TableContainer component= {Paper} elevation={2} sx={{ height: 600, mt: 2 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                        <TableCell sx={{ width: '40%' }}>Nombre</TableCell>
                                        <TableCell sx={{ width: '30%' }}>Tipo</TableCell>
                                        <TableCell sx={{ width: '30%' }}>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {filteredResources.map((resource) => (
                                        <TableBody key= {resource.name}>
                                            <TableCell>
                                                <Typography variant='body2' > {resource.name} </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant='body2' > {resource.type} </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{display:'flex', gap: 2}}>
                                                    <IconButton onClick= { () => handleOpenEditResource(resource)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={ () => handleDeleteResource(resource.name)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={ () => handleOpenViewDetails(resource)}>
                                                        <InfoIcon/>
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableBody>
                                    ))}
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
                <Dialog open= {isEditResource} onClose= {handleCloseEditResource}>
                    <DialogTitle> Editar recurso </DialogTitle>
                    <DialogContent>
                        <EditResource
                            onSaveResource={(resource) => {
                                if (resourceToEdit) {
                                    handleEditResource(resource);
                                }
                                handleCloseEditResource();
                            }}
                            resource={resourceToEdit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick= {handleCloseEditResource} color="primary"> Cancelar </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open= {isViewResource} onClose={handleCloseViewDetails}>
                    <DialogTitle> Detalle </DialogTitle>
                    <DialogContent>
                            <ViewResource
                                resource = {resourceToView}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick= {handleCloseViewDetails} color="primary"> Volver </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    )
}

export default ViewResources;