import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  HTTP_DELETE, HTTP_POST, HTTP_PUT, request
} from '../http/api';
import { QUERY_CATEGORIES } from '../http/query-names';
import { RESOURCE_CATEGORIES } from '../http/resources-names';

const getCategoriesRequest = () => request({ url: RESOURCE_CATEGORIES, method: 'GET' });

const addCategoryRequest = (categoryName) => request({
  url: RESOURCE_CATEGORIES,
  method: HTTP_POST,
  data: {
    name: categoryName,
    root: null,
    ancestors: []
  }
});

const updateCategoryRequest = ({ categoryName, categoryId }) => request({
  url: `${RESOURCE_CATEGORIES}/${categoryId}`,
  method: HTTP_PUT,
  data: { name: categoryName }
});

const deleteCategoryRequest = (categoryId) => request({
  url: `${RESOURCE_CATEGORIES}/${categoryId}`,
  method: HTTP_DELETE
});

export default function useCategories() {
  const queryCategories = (onSuccess, onError) => useQuery(QUERY_CATEGORIES, getCategoriesRequest, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError
  });

  const queryClient = useQueryClient();

  const addCategoryMutation = useMutation(addCategoryRequest, {
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_CATEGORIES, (oldQueryData) => ({
        ...oldQueryData,
        data: [...oldQueryData.data, data.data]
      }));
    }
  });

  const addCategory = (newCategoryName) => addCategoryMutation.mutate(newCategoryName);

  const updateCategoryMutation = useMutation(updateCategoryRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_CATEGORIES);
    }
  });

  const updateCategory = (categoryName, categoryId) => updateCategoryMutation.mutate(
    { categoryName, categoryId }
  );

  const deleteCategoryMutation = useMutation(deleteCategoryRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_CATEGORIES);
    }
  });

  const deleteCategory = (categoryId) => deleteCategoryMutation.mutate(categoryId);

  return {
    addCategory, updateCategory, deleteCategory, queryCategories
  };
}
