import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    root: {
      top: theme.spacing(9)
    }
  };
});

export default function Notification(props) {
  const { notify, closeNotification } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeNotification();
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert
        severity={notify.type || 'info'}
        onClose={handleClose}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
