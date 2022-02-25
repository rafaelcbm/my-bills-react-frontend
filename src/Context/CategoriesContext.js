import React, {
  createContext, useContext, useState
} from 'react';
import useCategories from '../hooks/useCategories';
import { AuthContext } from './AuthContext';

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const { authenticated } = useContext(AuthContext);

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
