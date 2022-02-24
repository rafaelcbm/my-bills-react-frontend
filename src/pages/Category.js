import React, { useState } from 'react';

export default function Category({ category, updateCategory, deleteCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [enableEdit, setEnableEdit] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [showSave, setShowSave] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  function onSaveBtnClick() {
    updateCategory(categoryName, category.id);
    setCategoryName('');

    setEnableEdit(false);
    setShowSave(false);
    setShowEdit(true);
    setShowCancel(false);
    setShowDelete(true);
  }

  function onDeleteBtnClick() {
    deleteCategory(category.id);
  }

  function onEditBtnClick() {
    setEnableEdit(true);
    setShowSave(true);
    setShowEdit(false);
    setShowCancel(true);
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
      {showSave && <button type="button" onClick={() => onSaveBtnClick(category)}>Save</button>}
      {showCancel && <button type="button" onClick={onCancelBtnClick}>Cancel</button>}
      {showCancel && <button type="button" onClick={() => onDeleteBtnClick()}>Delete</button>}
    </li>

  );
}
