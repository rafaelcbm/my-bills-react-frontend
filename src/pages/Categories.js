import React, { useState, useContext, useEffect } from 'react';

import { AuthContext } from '../Context/AuthContext';
import { CategoriesContext } from '../Context/CategoriesContext';

import Category from './Category';

export default function Categories() {
  const { handleLogout } = useContext(AuthContext);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  const {
    categories, getCategories, setCategories, addCategory
  } = useContext(CategoriesContext);

  const addCategoryBtnClick = async () => {
    await addCategory(newCategory);
    await getCategories(setCategories);
    setNewCategory('');
  };

  return (
    <>
      <ul>
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
          />
        ))}
      </ul>

      <br />
      <input
        type="text"
        value={newCategory}
        onChange={(event) => {
          setNewCategory(event.target.value);
        }}
        placeholder="Category Name"
      />

      <button type="button" onClick={addCategoryBtnClick}>Add</button>

      <br />
      <br />

      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}
