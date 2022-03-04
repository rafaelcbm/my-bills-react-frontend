import React from 'react';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select
} from '@mui/material';

export default function MuiSelect(props) {
  const {
    name, label, value, error = null, onChange, options
  } = props;

  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">Select...</MenuItem>
        {options.map(
          (option) => (<MenuItem key={option.value} value={option.value}>{option.key}</MenuItem>)
        )}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
