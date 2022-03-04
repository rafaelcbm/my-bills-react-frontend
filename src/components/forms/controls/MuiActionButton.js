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
      backgroundColor: theme.palette.secondary.light,
      '& .MuiButton-label': {
        color: theme.palette.secondary.main,
      }
    },
    primary: {
      backgroundColor: theme.palette.primary.light,
      '& .MuiButton-label': {
        color: theme.palette.primary.main,
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
