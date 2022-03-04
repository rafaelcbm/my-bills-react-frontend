import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

export function useForm(initialFValues, validate, validateOnChange = false) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm

  };
}

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    root: {
      '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(1)
      }
    }
  };
});

export function Form({ children, ...other }) {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}
