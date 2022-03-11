import { useQuery, useMutation, useQueryClient } from 'react-query';

import { request } from '../http/api';

const fetchCategories = () => request({ url: '/categories', method: 'GET' });

export default function useCategories() {
  const queryCategories = (onSuccess, onError) => useQuery('categories', fetchCategories, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError
  });

  const queryClient = useQueryClient();

  const addCategoryRequest = (categoryName) => request({
    url: '/categories',
    method: 'post',
    data: {
      name: categoryName,
      root: null,
      ancestors: []
    }
  });

  const mutation = useMutation(addCategoryRequest, {
    onSuccess: (data) => {
      console.log('mutation - onSuccess: data: ', data);
      queryClient.setQueryData('categories', (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, data.data]
      }));
    }
  });

  const addCategory = (newCategoryName) => mutation.mutate(newCategoryName);

  const updateCategoryRequest = ({ categoryName, categoryId }) => request({
    url: `/categories/${categoryId}`,
    method: 'put',
    data: { name: categoryName }
  });

  const updateCategoryMutation = useMutation(updateCategoryRequest, {
    onSuccess: (data) => {
      queryClient.refetchQueries(['categories'], { active: true });
    }
  });

  const updateCategory = (categoryName, categoryId) => updateCategoryMutation.mutate(
    { categoryName, categoryId }
  );

  const deleteCategoryRequest = (categoryId) => request({
    url: `/categories/${categoryId}`,
    method: 'delete'
  });

  const deleteCategoryMutation = useMutation(deleteCategoryRequest, {
    onSuccess: (data) => {
      queryClient.refetchQueries(['categories'], { active: true });
    }
  });

  const deleteCategory = (categoryId) => deleteCategoryMutation.mutate(categoryId);

  return {
    addCategory, updateCategory, deleteCategory, queryCategories
  };
}
