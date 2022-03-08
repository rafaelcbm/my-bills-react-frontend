import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
// import ptBR from 'date-fns/locale/pt-BR';
import enLocale from 'date-fns/locale/en-US';

export default function MuiDatePicker(props) {
  const {
    name, label, value, onChange, error = null
  } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: { name, value }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
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
