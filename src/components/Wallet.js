import React, { useReducer, useState } from 'react';

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
  const [walletName, setWalletName] = useState('');
  const [fieldState, dispatchFieldUpdate] = useReducer(reducer, initialState);

  const { updateWallet, deleteWallet } = useWallets();

  function onSaveBtnClick() {
    dispatchFieldUpdate('save');
    setWalletName('');
    updateWallet(walletName, wallet.id);
  }

  function onDeleteBtnClick() {
    dispatchFieldUpdate('delete');
    deleteWallet(wallet.id);
  }

  return (
    <li>
      {wallet.name}
      {fieldState.enableEdit && (
      <input
        type="text"
        value={walletName}
        onChange={(event) => {
          setWalletName(event.target.value);
        }}
        placeholder={wallet.name}
      />
      )}
      {fieldState.showEdit && <button type="button" onClick={() => dispatchFieldUpdate('edit')}>Edit</button>}
      {fieldState.showSave && <button type="button" onClick={onSaveBtnClick}>Save</button>}
      {fieldState.showCancel && <button type="button" onClick={() => dispatchFieldUpdate('cancel')}>Cancel</button>}
      {fieldState.showDelete && <button type="button" onClick={onDeleteBtnClick}>Delete</button>}
    </li>

  );
}
