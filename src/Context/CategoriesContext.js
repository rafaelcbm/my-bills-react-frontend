import React, { createContext, useState } from 'react';
import useCategories from '../hooks/useCategories';

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const {
    getCategories, addCategory, updateCategory, deleteCategory
  } = useCategories();

  return (
    <CategoriesContext.Provider value={{
      categories, setCategories, getCategories, addCategory, updateCategory, deleteCategory
    }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesContext, CategoriesProvider };
