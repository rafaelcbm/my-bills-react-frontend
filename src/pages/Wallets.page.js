import React, { useState, useContext } from 'react';

import { WalletsContext } from '../Context/WalletsContext';
import Wallet from '../components/Wallet';
import useWallets from '../hooks/useWallets';

export function Wallets() {
  const [newWallet, setNewWallet] = useState('');

  const { wallets, setWallets } = useContext(WalletsContext);

  const { addWallet, queryWallets } = useWallets();

  const onSuccessQueryWallets = (data) => setWallets(data?.data);

  const onErrorQueryWallets = console.log;

  const {
    isLoading, data, isError, error, refetch
  } = queryWallets(onSuccessQueryWallets, onErrorQueryWallets);

  const addWalletBtnClick = () => {
    addWallet(newWallet);
    // refetch();
    setNewWallet('');
  };

  return (
    <div>
      <div>
        <ul>
          {wallets.map((wallet) => (
            <Wallet
              key={wallet.id}
              wallet={wallet}
            />
          ))}
        </ul>
      </div>

      <div>
        <input
          type="text"
          value={newWallet}
          onChange={(event) => {
            setNewWallet(event.target.value);
          }}
          placeholder="Wallet Name"
        />
      </div>

      <div>
        <button type="button" onClick={addWalletBtnClick}>Add</button>
      </div>
    </div>
  );
}

export default Wallets;
