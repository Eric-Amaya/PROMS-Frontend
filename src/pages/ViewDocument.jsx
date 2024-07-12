import React, { useState } from 'react';
import { TextField, Box, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem , Select, FormControl, Typography} from '@mui/material';
import { Download as DownloadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import CustomButton from '../components/ViewProyect-Page/ViewDocument/customButton';
import UploadIcon from '@mui/icons-material/Upload';
import ViewChat from './ViewChat';

const ViewDocument = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [documents, setDocuments] = useState([
        { name: 'Documento 1', date: '01-08-2023', url: '#' },
        { name: 'Documento 2', date: '12-07-2023', url: '#' },
        { name: 'Documento 3', date: '14-07-2023', url: '#' },
        { name: 'Documento 4', date: '12-02-2023', url: '#' },
        { name: 'Documento 6', date: '01-07-2023', url: '#' },
        { name: 'Documento 7', date: '02-11-2023', url: '#' },
    ]);

    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    const sortedDocuments = [...documents].sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        if (filter === 'mayor-menor') {
            return dateB - dateA;
        } else if (filter === 'menor-mayor') {
            return dateA - dateB;
        } else {
            return 0;
        }
    });

    const filteredDocuments = sortedDocuments.filter((doc) =>
        (searchTerm === '' || doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSortChange = (event) => {
        setFilter(event.target.value);
    }

    const handleDownload = () => {
        // Logica para descargar
    }

    const handleUpload = () => {
        // Logica para descargar
    }
    
    const handleDelete = (name) => {
        setDocuments(documents.filter(doc => doc.name !== name));
    };

    return (
        <div>
            <MenuProject projectName={"Project Name"} />
            <Box sx={{
                justifyContent: 'flex-start', 
                alignItems: 'center', 
                padding: 6, 
            }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 , fontFamily: 'Open Sans'}}>
                        <TextField
                            label="Buscar por nombre"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {(filteredDocuments.length === 0 ) && (
                            <Typography variant= 'body1' sx={{marginTop: '24px'}}> No se encontraron coincidencias </Typography>
                        )}
                    </Box>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-standard-label">Ordenar por</InputLabel>
                        <Select 
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={filter}
                            label="Ordenar por"
                            onChange={handleSortChange}
                        >
                            <MenuItem value={'mayor-menor'}>Mas recientes</MenuItem>
                            <MenuItem value={'menor-mayor'}>Mas antiguos</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer component={Paper} sx={{ height: 400, mt: 2 }}>
                    <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '40%' }}>Nombre</TableCell>
                            <TableCell sx={{ width: '30%' }}>Fecha</TableCell>
                            <TableCell sx={{ width: '30%' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDocuments.map((doc) => (
                        <TableRow key={doc.name}>
                            <TableCell>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                    {doc.name}
                                </a>
                            </TableCell>
                            <TableCell>{doc.date}</TableCell>
                            <TableCell>
                                <Box sx={{display:'flex', gap: 2}}>
                                    <IconButton href={doc.url} download>
                                        <DownloadIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(doc.name)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <CustomButton variant="contained" icon = {<UploadIcon />} >Subir Documento</CustomButton>
                </Box>
                <ViewChat/>
            </Box>
        </div>
    );
};

export default ViewDocument;