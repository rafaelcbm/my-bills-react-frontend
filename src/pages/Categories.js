import React, { useState, useContext } from 'react';

import { CategoriesContext } from '../Context/CategoriesContext';
import Category from '../components/Category';
import useCategories from '../hooks/useCategories';

export function Categories() {
  console.log('Categories - COMPONENT');
  const [newCategory, setNewCategory] = useState('');

  const { categories, setCategories } = useContext(CategoriesContext);

  const { addCategory, queryCategories } = useCategories();

  const onSuccessQueryCategories = (data) => setCategories(data?.data);

  const onErrorQueryCategories = console.log;

  const {
    isLoading, data, isError, error, refetch
  } = queryCategories(onSuccessQueryCategories, onErrorQueryCategories);

  const addCategoryBtnClick = () => {
    addCategory(newCategory);
    refetch();
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

export default Categories;
