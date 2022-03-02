import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Logout() {
  const { handleLogout } = useContext(AuthContext);

  return (<button type="button" onClick={handleLogout}>Sair</button>);
}
