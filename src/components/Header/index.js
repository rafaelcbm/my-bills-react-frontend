import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, AppBar, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import styles from './Header.module.css';
import Logout from '../Logout';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>

        <div style={{
          display: 'flex', width: '100%', marginTop: '5px'
        }}
        >
          <div style={{ flexGrow: '2', display: 'inline-flex' }}>
            <AttachMoneyIcon fontSize="large" color="warning" />
            <Typography variant="h5">
              My Bills
            </Typography>
          </div>

          <Typography variant="h6" style={{ flexGrow: '1' }}>
            <Link className={styles.header_link} to="/">Home</Link>
          </Typography>

          <Typography variant="h6" style={{ flexGrow: '1' }}>
            <Link className={styles.header_link} to="/wallets">Wallets</Link>
          </Typography>

          <Typography variant="h6" style={{ flexGrow: '1' }}>
            <Link className={styles.header_link} to="/categories">Categories</Link>
          </Typography>

          <Typography variant="h6" style={{ flexGrow: '1' }}>
            <Link className={styles.header_link} to="/monthly-bills">Monthly Bills</Link>
          </Typography>
          <div style={{ flexGrow: '23', textAlign: 'end' }}>
            <Logout />
          </div>
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
