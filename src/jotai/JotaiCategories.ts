import { TypeCategories, DBCategories } from '../types/Categories';
import axios from 'axios';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { atomWithStorage, loadable } from 'jotai/utils';

interface ApiResponse {
  categories: DBCategories[];
}

export const fetchCategories = async (): Promise<TypeCategories[]> => {
  const {data} = await axios.get<ApiResponse>('http://localhost:3000/api/posts/categories');
  const categories = data
    .categories.map<TypeCategories>((category: DBCategories) => ({...category, checked: false}));
  return categories;
};

export const [atomCategories] = atomsWithQuery(() => ({
  queryKey: ['categories'],
  queryFn: fetchCategories,  
}));

export const LoadableAtomCategories = loadable(atomCategories);

export const AtomCat = atomWithStorage<TypeCategories[]>('savedCategories', []);
