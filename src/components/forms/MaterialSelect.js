import React from 'react';

import {
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';

function MaterialSelect(props) {
  const {
    label, name, options, onChange, value, ...rest
  } = props;
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId="categories"
        id="categoryId"
        value={value}
        name={name}
        label={label}
        onChange={onChange}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.key}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MaterialSelect;
