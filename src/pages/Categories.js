import React, { useState, useEffect, useContext } from 'react';

import api from '../api';
import { Context } from '../Context/AuthContext';

export default function Categories() {
  const { handleLogout } = useContext(Context);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/categories');

      setCategories(data);
    })();
  }, []);

  return (
    <>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}
