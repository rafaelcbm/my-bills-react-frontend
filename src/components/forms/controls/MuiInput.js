/* eslint-disable react/jsx-boolean-value */
import React, { useCallback } from 'react';
import { TextField } from '@mui/material';

import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = React.forwardRef((
  props,
  ref
) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale={false}
      allowNegative={false}
      isNumericString
      prefix="R$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default function MuiInput(props) {
  const {
    name, label, value, error = null, onChange, currency, ...other
  } = props;

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputProps={currency ? { inputComponent: NumberFormatCustom } : undefined}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
