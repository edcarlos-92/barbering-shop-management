import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


interface AlertElementProps {
    message;
    severity;
    props;
  }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UseAlert(props) {
  const [open, setOpen] = React.useState(false);
  const { notify, setNotify } = props;


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotify({
        ...notify,
        isOpen: false,
        
    })

    setOpen(false);
  };

    const classes:any = {
        root: {
            top: '9em' 
        },
    }

  return (
      <Snackbar 
      //open={open} 
      //autoHideDuration={6000} 
      //onClose={handleClose}
       //className={classes.root}
       
       open={notify.isOpen}
       autoHideDuration={3000}
       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
       onClose={handleClose}
      
      
      >
        <Alert onClose={handleClose} severity={props.type} 
        sx={{ 
                width: '100%',
                '& .MuiAlert-icon':{
                    paddingTop:'10px',
                }, 
                '& .MuiAlert-message':{
                    paddingTop:'12px',
                },   
            }}>
          {/* {message=''}  */}
          {notify.message}
        </Alert>
      </Snackbar>
      /*<Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> 
      */
  );
}
