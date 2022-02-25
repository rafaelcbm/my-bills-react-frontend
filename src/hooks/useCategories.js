import api from '../api';

export default function useCategories() {
  async function getCategories(updateDataCallback) {
    const { data } = await api.get('/categories');
    if (updateDataCallback && data) {
      updateDataCallback(data);
    }
  }

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
