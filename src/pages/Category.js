import React, { useContext, useReducer, useState } from 'react';
import { CategoriesContext } from '../Context/CategoriesContext';

const initialState = {
  enableEdit: false,
  showEdit: true,
  showSave: false,
  showCancel: false,
  showDelete: false
};

function reducer(state, action) {
  switch (action) {
    case 'edit':
      return {
        enableEdit: true,
        showEdit: false,
        showSave: true,
        showCancel: true,
        showDelete: true
      };
    case 'save':
      return {
        enableEdit: false,
        showEdit: true,
        showSave: false,
        showCancel: false,
        showDelete: false
      };
    case 'cancel':
      return {
        enableEdit: false,
        showEdit: true,
        showSave: false,
        showCancel: false,
        showDelete: false
      };
    default:
      return initialState;
  }
}

export default function Category({ category }) {
  const [categoryName, setCategoryName] = useState('');
  const [fieldState, dispatchFieldUpdate] = useReducer(reducer, initialState);

  const {
    updateCategory, deleteCategory, getCategories, setCategories
  } = useContext(CategoriesContext);

  async function onSaveBtnClick() {
    dispatchFieldUpdate('save');
    setCategoryName('');

    await updateCategory(categoryName, category.id);
    await getCategories(setCategories);
  }

  async function onDeleteBtnClick() {
    dispatchFieldUpdate('delete');

    await deleteCategory(category.id);
    await getCategories(setCategories);
  }

  return (
    <li>
      {category.name}
      {fieldState.enableEdit && (
      <input
        type="text"
        value={categoryName}
        onChange={(event) => {
          setCategoryName(event.target.value);
        }}
        placeholder={category.name}
      />
      )}
      {fieldState.showEdit && <button type="button" onClick={() => dispatchFieldUpdate('edit')}>Edit</button>}
      {fieldState.showSave && <button type="button" onClick={onSaveBtnClick}>Save</button>}
      {fieldState.showCancel && <button type="button" onClick={() => dispatchFieldUpdate('cancel')}>Cancel</button>}
      {fieldState.showDelete && <button type="button" onClick={onDeleteBtnClick}>Delete</button>}
    </li>

  );
}
