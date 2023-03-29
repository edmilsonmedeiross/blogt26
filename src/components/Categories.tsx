import React, { ChangeEvent, useEffect } from 'react';
import { TypeCategories } from '@/types/Categories';
// import { useAtom } from 'jotai';
// import { atomCategories } from '@/jotai/JotaiCategories';
import { atom, useAtom } from 'jotai';

interface PageCategoriesProps {
  categories: TypeCategories[];
  setStateCategories: React.Dispatch<React.SetStateAction<TypeCategories[]>>;
}
const categoriesComp = atom([]);

function Categories({ categories }: PageCategoriesProps) {
  const [categoriesComponent, setStateCategories] = useAtom(categoriesComp);

  useEffect(() => {
    setStateCategories(categories);
  },[]);

  
  const handleCheckboxChange = (event:  ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newCategories = categoriesComponent.map((category) => {
      if (name === category.categoryName) {
        console.log('achooooooou');
        
        return { ...category, checked };
      }
      return category;
    });
    console.log('newCategories =====> ', newCategories);
    
    setStateCategories(newCategories);
    localStorage.setItem('savedCategories', JSON.stringify(newCategories));
  };

  if (!categories?.length) return <div>Loading...</div>;

  return (
    <div>
      <h2>Escolha a(as) categoria(as) do seu post:</h2>
      <form>
        
        {
          categoriesComponent.map((categoria: TypeCategories) => (
            <label key={categoria.categoryName}>
              <input
                type="checkbox"
                name={categoria.categoryName}
                checked={categoria.checked}
                onChange={handleCheckboxChange}
              />
              {categoria.categoryName}
            </label>
          ))
        }
        
      </form>
    </div>
  );
}

export default Categories;
