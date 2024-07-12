import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText, TextField, Box, Typography, Paper,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const CommentsDialog = ({ open, onClose, comments, onSaveComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSaveComment = () => {
    if (newComment.trim() !== '') {
      onSaveComment({ content: newComment, date: new Date(), participant: 'Eric Amaya' });
      setNewComment('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveComment();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Comentarios</DialogTitle>
      <DialogContent>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index} sx={{ display: 'block' }}>
              <Paper sx={{ padding: 2, marginBottom: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="body1">
                  {comment.participant}
                </Typography>
                <Box sx={{ maxHeight: 100, overflow: 'auto', padding: 1, marginBottom: 1 }}>
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    {comment.content}
                  </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {new Date(comment.date).toLocaleString()}
                </Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Box display='flex' flexDirection='row' alignItems='center' p={3} sx={{ position: 'sticky', bottom: 0, backgroundColor: 'white' }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
        />
        <IconButton onClick={handleSaveComment} sx={{ml: 3, mr: 3}}>
          <SendIcon></SendIcon>
        </IconButton>
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
