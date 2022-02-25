import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './history';

import { AuthProvider } from './Context/AuthContext';
import { CategoriesProvider } from './Context/CategoriesContext';

function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </CategoriesProvider>
    </AuthProvider>
  );
}

export default App;
