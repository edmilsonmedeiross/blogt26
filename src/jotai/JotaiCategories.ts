import { TypeCategories, DBCategories } from '../types/Categories';
import axios from 'axios';
import { atomsWithQuery } from 'jotai-tanstack-query';

interface ApiResponse {
  categories: DBCategories[];
}

export const fetchCategories = async (): Promise<TypeCategories[]> => {
  const {data} = await axios.get<ApiResponse>('http://localhost:3000/api/posts/categories');
  const categories = data
    .categories.map<TypeCategories>((categoria: DBCategories) => ({...categoria, checked: false}));
  return categories;
};

export const [atomCategories] = atomsWithQuery(() => ({
  queryKey: ['categories'],
  queryFn: fetchCategories
}));

