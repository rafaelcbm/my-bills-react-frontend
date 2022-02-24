import api from '../api';

export default function useCategories() {
  const getCategories = async (callBack) => {
    const { data } = await api.get('/categories');
    callBack(data);
  };

  const addCategory = async (categoryName) => {
    await api.post('/categories', {
      name: categoryName,
      root: null,
      ancestors: []
    });
  };

  const updateCategory = async (categoryName, categoryId) => {
    await api.put(`/categories/${categoryId}`, { name: categoryName });
  };

  const deleteCategory = async (categoryId) => {
    await api.delete(`/categories/${categoryId}`);
  };

  return {
    getCategories, addCategory, updateCategory, deleteCategory
  };
}
