import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

export default function MuiDatePicker(props) {
  const {
    name, label, value, onChange, error = null
  } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => {
    console.log('name ', name);
    console.log('value ', value);

    return {
      target: { name, value }
    };
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => (
          <TextField
            fullWidth
            variant="standard"
            {...params}
            {...(error && { error: true, helperText: error })}
          />
        )}
      />
    </LocalizationProvider>
  );
}
