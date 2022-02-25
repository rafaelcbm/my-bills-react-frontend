import api, { handleApiError } from '../api';

export default function useCategories() {
  async function getCategories(updateDataCallback) {
    try {
      const { data } = await api.get('/categories');
      if (updateDataCallback && data) {
        updateDataCallback(data);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  const addCategory = async (categoryName) => {
    try {
      await api.post('/categories', {
        name: categoryName,
        root: null,
        ancestors: []
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const updateCategory = async (categoryName, categoryId) => {
    try {
      await api.put(`/categories/${categoryId}`, { name: categoryName });
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
    } catch (error) {
      handleApiError(error);
    }
  };

  return {
    getCategories, addCategory, updateCategory, deleteCategory
  };
}
