import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, IconButton
} from '@mui/material';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

import Controls from './controls/Controls';

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    dialog: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
    },
    dialogTitle: {
      textAlign: 'center'
    },
    dialogContent: {
      textAlign: 'center'
    },
    dialogAction: {
      justifyContent: 'center'
    },
    titleIcon: {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
        cursor: 'default'
      },
      '& .MuiSvgIcon-root': {
        fontSize: '8rem',
      }
    }
  };
});

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.MuiButton
          text="No"
          color="error"
          variant="outlined"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.MuiButton
          text="Yes"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
