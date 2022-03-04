import React, { useState, useContext, useEffect } from 'react';

import { CategoriesContext } from '../Context/CategoriesContext';

import Category from '../components/Category';

export default function Categories() {
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
    <div>
      <div>
        <ul>
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
            />
          ))}
        </ul>
      </div>

      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(event) => {
            setNewCategory(event.target.value);
          }}
          placeholder="Category Name"
        />
      </div>

      <div>
        <button type="button" onClick={addCategoryBtnClick}>Add</button>
      </div>
    </div>
  );
}
