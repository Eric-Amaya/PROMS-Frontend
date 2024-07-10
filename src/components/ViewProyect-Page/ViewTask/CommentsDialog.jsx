import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, TextField, Box
} from '@mui/material';

const CommentsDialog = ({ open, onClose, comments, onSaveComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSaveComment = () => {
    if (newComment.trim() !== '') {
      onSaveComment({ content: newComment, date: new Date() });
      setNewComment('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Comentarios</DialogTitle>
      <DialogContent>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={comment.content}
                secondary={new Date(comment.date).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Box sx={{ padding: '16px', position: 'sticky', bottom: 0, backgroundColor: 'white' }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="outlined"
        />
        <Button onClick={handleSaveComment} color="primary">
          Guardar Comentario
        </Button>
      </Box>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentsDialog;
