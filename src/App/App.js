import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider, QueryClient } from 'react-query';

import Routes from '../routes';
import history from '../history';

import { AuthProvider } from '../Context/AuthContext';
import { CategoriesProvider } from '../Context/CategoriesContext';
import Login from '../pages/Login';
import { WalletsProvider } from '../Context/WalletsContext';

const theme = createTheme();
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <AuthProvider>
          <WalletsProvider>
            <CategoriesProvider>
              <Router history={history}>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Routes />
                </Switch>
              </Router>
            </CategoriesProvider>
          </WalletsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
