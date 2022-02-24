import React, { useState, useEffect, useContext } from 'react';

import api from '../api';
import { Context } from '../Context/AuthContext';
import useCategories from '../hooks/useCategories';

import Category from './Category';

export default function Categories() {
  const {
    getCategories, addCategory, updateCategory, deleteCategory
  } = useCategories();
  const { handleLogout } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  const updateCategoryCallback = async (categoryName, categoryId) => {
    await updateCategory(categoryName, categoryId);
    await getCategories(setCategories);
  };

  const deleteCategoryCallback = async (categoryId) => {
    await deleteCategory(categoryId);
    await getCategories(setCategories);
  };

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
            updateCategory={updateCategoryCallback}
            deleteCategory={deleteCategoryCallback}
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
