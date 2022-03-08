import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    root: {
      margin: theme.spacing(0.5),
      textTransform: 'none'
    }
  };
});

export default function MuiButton(props) {
  const {
    text, size, color, variant, onClick, ...other
  } = props;
  const classes = useStyles();

  return (
    <Button
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </Button>
  );
}
