import React from 'react';
import { Toolbar, AppBar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">
          My Bills App
        </Typography>
        <div style={{
          display: 'flex', marginLeft: '5em', justifyContent: 'space-between', width: '20%'
        }}
        >
          <Typography variant="h6">
            <Link to="/">Home</Link>
          </Typography>

          <Typography variant="h6">
            <Link to="/categories">Categories</Link>
          </Typography>

          <Typography variant="h6">
            <Link to="/bills">Bills</Link>
          </Typography>

          <Typography variant="h6">
            <Link to="/monthly-bills">Monthly Bills</Link>
          </Typography>

        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
