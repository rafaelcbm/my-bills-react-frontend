import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../Context/CategoriesContext';

export default function Category({ category }) {
  const [categoryName, setCategoryName] = useState('');
  const [enableEdit, setEnableEdit] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [showSave, setShowSave] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const {
    updateCategory, deleteCategory, getCategories, setCategories
  } = useContext(CategoriesContext);

  async function onSaveBtnClick() {
    await updateCategory(categoryName, category.id);
    await getCategories(setCategories);

    setCategoryName('');

    setEnableEdit(false);
    setShowSave(false);
    setShowEdit(true);
    setShowCancel(false);
    setShowDelete(false);
  }

  async function onDeleteBtnClick() {
    await deleteCategory(category.id);
    await getCategories(setCategories);
  }

  function onEditBtnClick() {
    setEnableEdit(true);
    setShowSave(true);
    setShowEdit(false);
    setShowCancel(true);
    setShowDelete(true);
  }

  function onCancelBtnClick() {
    setEnableEdit(false);
    setShowEdit(true);
    setShowSave(false);
    setShowCancel(false);
  }

  return (
    <li>
      {category.name}
      {enableEdit && (
      <input
        type="text"
        value={categoryName}
        onChange={(event) => {
          setCategoryName(event.target.value);
        }}
        placeholder={category.name}
      />
      )}
      {showEdit && <button type="button" onClick={onEditBtnClick}>Edit</button>}
      {showSave && <button type="button" onClick={onSaveBtnClick}>Save</button>}
      {showCancel && <button type="button" onClick={onCancelBtnClick}>Cancel</button>}
      {showDelete && <button type="button" onClick={onDeleteBtnClick}>Delete</button>}
    </li>

  );
}
