import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    root: {
      minWidth: 0,
      margin: theme.spacing(0.5)
    },
    secondary: {
      backgroundColor: theme.palette.error.light,
      '&.MuiButton-textPrimary': {
        color: theme.palette.error.dark,
      }
    },
    primary: {
      backgroundColor: theme.palette.grey[200],
      '&.MuiButton-textPrimary': {
        color: theme.palette.primary.dark,
      }
    },
  };
});

export default function MuiActionButton(props) {
  const { color, children, onClick } = props;
  const classes = useStyles();

  return (
    <Button
      className={`${classes.root} ${classes[color]}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
