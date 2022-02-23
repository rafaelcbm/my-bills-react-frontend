import React, { useContext, useState } from 'react';
import { Context } from '../Context/AuthContext';

export default function Login() {
  const { authenticated, handleLogin } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <input
        type="text"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="button" onClick={() => handleLogin(email, password)}>Entrar</button>
    </>
  );
}
