import React, { createContext, useState } from 'react';

const WalletsContext = createContext();

function WalletsProvider({ children }) {
  const [wallets, setWallets] = useState([]);

  return (
    <WalletsContext.Provider value={{
      wallets,
      setWallets
    }}
    >
      {children}
    </WalletsContext.Provider>
  );
}

export { WalletsContext, WalletsProvider };
