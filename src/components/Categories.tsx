import React, { ChangeEvent, useEffect } from 'react';
import { TypeCategories } from '@/types/Categories';
import { useAtom } from 'jotai';
import { AtomCat, LoadableAtomCategories } from '@/jotai/JotaiCategories';

function Categories() {
  const [result] = useAtom(LoadableAtomCategories);
  const [test, setTest] = useAtom(AtomCat);

  useEffect(() => {
  const savedCategories = localStorage.getItem('savedCategories');
    if (result.state === 'hasData' && !savedCategories) {
      setTest(result.data);
    } 
  }, [result.state]);

  const handleCheckboxChange = (event:  ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (result.state === 'hasData') {
      const newCategories = test.map<TypeCategories>((category) => {
        if (name === category.categoryName) {
          return { ...category, checked };
        }
        return category;
      });
      setTest(newCategories);
    }
  };

  if (result.state === 'hasError' && result.error instanceof String) {
    const { error } = result;
    return <div>{error}</div>;
  }
  if (result.state === 'loading') return <div>Loading...</div>;

  return (
    <div>
      <h2>Escolha a(as) categoria(as) do seu post:</h2>
      <form>
        
        {
          result.state ==='hasData' && test.map((category: TypeCategories) => (
            <label key={category.categoryName}>
              <input
                type="checkbox"
                name={category.categoryName}
                checked={category.checked}
                onChange={handleCheckboxChange}
              />
              {category.categoryName}
            </label>
          ))
        }
        
      </form>
    </div>
  );
}

export default Categories;
