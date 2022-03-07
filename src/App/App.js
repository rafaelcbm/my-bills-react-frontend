import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Routes from '../routes';
import history from '../history';

import { AuthProvider } from '../Context/AuthContext';
import { CategoriesProvider } from '../Context/CategoriesContext';
import Login from '../pages/Login';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CategoriesProvider>
          <Router history={history}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Routes />
            </Switch>
          </Router>
        </CategoriesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
