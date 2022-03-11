import { useQuery } from 'react-query';

import api, { handleApiError } from '../api';

const fetchCategories = () => api.get('/categories');

export default function useCategories() {
  const queryCategories = (onSuccess, onError) => useQuery('categories', fetchCategories, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError
  });

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
    addCategory, updateCategory, deleteCategory, queryCategories
  };
}
