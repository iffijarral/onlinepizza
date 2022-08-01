import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SnackBar(props) {

  const vertical = 'bottom';
  const horizontal = 'center';

  return (
    <div>

      <Snackbar 
        open={props.open} 
        autoHideDuration={3000} 
        onClose={props.handleClose}  
        anchorOrigin={{ vertical, horizontal}}
        sx={{ zIndex: '20001 !important' }}
      >
        <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%', zIndex: '20001 !important' }}>
          {props.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}