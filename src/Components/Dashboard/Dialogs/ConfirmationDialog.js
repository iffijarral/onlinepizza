import * as React from 'react';

import { 
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Typography
} from '@mui/material';

export const ConfirmationDialog = (props) => {
    
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={props.open}      
    >
      <DialogTitle>{props.type === 'subCategory' ? 'Delete Sub-Category' : props.type ==='category' ? 'Delete Category' : 'Delete Product'}</DialogTitle>
      <DialogContent dividers>
        <Typography variant='body2'>
            Are you sure you want to delete "{props.category && props.category.name}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
          Cancel
        </Button>
        <Button onClick={props.handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
