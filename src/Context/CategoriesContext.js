import React, { createContext, useState } from 'react';
import useCategories from '../hooks/useCategories';

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  return (
    <CategoriesContext.Provider value={{
      categories,
      setCategories
    }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesContext, CategoriesProvider };
