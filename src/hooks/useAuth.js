import { useState, useEffect } from 'react';
import api, { handleApiError } from '../api';

import history from '../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers['x-access-token'] = `${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(email, password) {
    try {
      const { data: { accessToken } } = await api.post('/login', {
        email, password,
      });

      localStorage.setItem('token', JSON.stringify(accessToken));
      api.defaults.headers['x-access-token'] = `${accessToken}`;
      setAuthenticated(true);
      history.push('/categories');
    } catch (error) {
      handleApiError(error);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers['x-access-token'] = undefined;
    history.push('/login');
  }

  return {
    authenticated, loading, handleLogin, handleLogout,
  };
}
