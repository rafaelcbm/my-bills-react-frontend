import React, { createContext, useState } from 'react';

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
