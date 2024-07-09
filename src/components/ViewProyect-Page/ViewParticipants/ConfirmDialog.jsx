import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, description }) => {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} color="primary">Confirmar</Button>
                <Button onClick={onClose} color="error">Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
