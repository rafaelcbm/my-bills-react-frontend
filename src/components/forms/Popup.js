import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, Typography
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';

import Controls from './controls/Controls';

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
    },
    dialogTitle: {
      paddingRight: '0px'
    }
  };
});

export default function Popup(props) {
  const {
    title, children, openPopup, setOpenPopup
  } = props;
  const classes = useStyles();

  return (
    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.MuiActionButton
            color="secondary"
            onClick={() => { setOpenPopup(false); }}
          >
            <CloseIcon />
          </Controls.MuiActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}
