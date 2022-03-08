import React, { useContext, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../Context/AuthContext';

export default function Logout() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <LogoutIcon
      style={{ cursor: 'pointer' }}
      fontSize="large"
      onClick={handleLogout}
    />
  );
}
