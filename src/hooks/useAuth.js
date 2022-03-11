import { useState, useEffect } from 'react';
import { httpClient, request } from '../http/api';

import history from '../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      httpClient.defaults.headers['x-access-token'] = `${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(email, password) {
    const { data: { accessToken } } = await request({
      method: 'POST',
      url: '/login',
      data: { email, password }
    });

    localStorage.setItem('token', JSON.stringify(accessToken));
    httpClient.defaults.headers['x-access-token'] = `${accessToken}`;
    setAuthenticated(true);
    history.push('/categories');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    httpClient.defaults.headers['x-access-token'] = undefined;
    history.push('/login');
  }

  return {
    authenticated, loading, handleLogin, handleLogout,
  };
}
