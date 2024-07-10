import { Box } from '@mui/material';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import CustomButton from './customButton';
import { resourceFormSchema } from '../../../validation/resource-form-schema';
import * as Yup from 'yup';

const EditResource = ({onSaveResource, resource}) => {
    const [name, setName] = useState(resource ? resource.name : '');
    const [type, setType] = useState(resource ? resource.type : '');
    const [content, setContent] = useState(resource ? resource.content : '');
    const [errors, setErrors] = useState({});
    const validationSchema = resourceFormSchema;

    const handleSave = async () => {
        const editedResource = { name: name, type: type, content: content };
        try{
            await validationSchema.validate(editedResource, { abortEarly: false});
            onSaveResource(editedResource);
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

    const clearError = (field) => {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[field];
          return newErrors;
        });
    };

    return (
        <Box component ="form" noValidate autoComplete='off' sx={{display: 'flex', flexDirection: 'column', gap: 4, p: 2}}>
            <Box sx= {{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                <TextField 
                    label="Nombre" 
                    variant="standard"  
                    sx= {{widht: 250, mr: 10}}
                    value= {name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => clearError('name')}
                    error= {!!errors.name}
                    helperText={errors.name}
                />
                <TextField 
                    label="Tipo" 
                    variant="standard"  
                    sx={{width: 250}}
                    value= {type}
                    onChange={(e) => setType(e.target.value)}
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
                sx={{maxHeight: 300}} 
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => clearError('content')}
                error= {!!errors.content}
                helperText= {errors.content }
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
                <CustomButton variant="contained" onClick= {handleSave} >Guardar cambios</CustomButton>
            </Box>
        </Box>        
    );
};

export default EditResource;