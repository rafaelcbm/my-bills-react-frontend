import React from 'react';
import { FormControl, FormControlLabel, Checkbox } from '@mui/material';

export default function MuiCheckbox(props) {
  const {
    name, label, value, onChange
  } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  });

  return (
    <FormControl>
      <FormControlLabel
        control={(
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => onChange(convertToDefEventPara(name, e.target.checked))}
          />
)}
        label={label}
      />
    </FormControl>
  );
}
