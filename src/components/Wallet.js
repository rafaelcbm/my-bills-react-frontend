/* eslint-disable react/jsx-no-bind */
import React, { useReducer } from 'react';

import {
  Button, TextField, Typography
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useWallets from '../hooks/useWallets';

const initialState = {
  enableEdit: false,
  showEdit: true,
  showSave: false,
  showCancel: false,
  showDelete: false
};

function reducer(state, action) {
  switch (action) {
    case 'edit':
      return {
        enableEdit: true,
        showEdit: false,
        showSave: true,
        showCancel: true,
        showDelete: true
      };
    case 'save':
      return {
        enableEdit: false,
        showEdit: true,
        showSave: false,
        showCancel: false,
        showDelete: false
      };
    case 'cancel':
      return {
        enableEdit: false,
        showEdit: true,
        showSave: false,
        showCancel: false,
        showDelete: false
      };
    default:
      return initialState;
  }
}

export default function Wallet({ wallet }) {
  const [fieldState, dispatchFieldUpdate] = useReducer(reducer, initialState);

  const { updateWallet, deleteWallet } = useWallets();

  function onDeleteBtnClick() {
    dispatchFieldUpdate('delete');
    deleteWallet(wallet.id);
  }

  const schema = yup.object().shape({
    name: yup.string().required()
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), });

  const onSubmit = (frmData) => {
    dispatchFieldUpdate('save');
    updateWallet(frmData.name, wallet.id);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <li>
        <Typography variant="h6" component="span">
          {wallet.name}
        </Typography>

        {fieldState.enableEdit && (
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              placeholder={wallet.name}
              label="Name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : ''}
              fullWidth
              margin="dense"
            />
          )}
        />
        )}
        {fieldState.showEdit
          && (
          <Button
            style={{ margin: '0.5em 1em' }}
            variant="outlined"
            size="small"
            color="secondary"
            type="button"
            onClick={() => dispatchFieldUpdate('edit')}
          >
            Edit
          </Button>
          )}

        {fieldState.showSave && (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          type="submit"
        >
          Save
        </Button>
        )}
        {fieldState.showCancel
           && (
           <Button
             style={{ marginLeft: '0.5em' }}
             variant="outlined"
             size="small"
             color="secondary"
             type="button"
             onClick={() => dispatchFieldUpdate('cancel')}
           >
             Cancel
           </Button>
           )}

        {fieldState.showDelete
       && (
       <Button
         style={{ marginLeft: '0.5em' }}
         variant="outlined"
         size="small"
         color="error"
         type="button"
         onClick={onDeleteBtnClick}
       >
         Delete
       </Button>
       )}
      </li>
    </form>
  );
}
