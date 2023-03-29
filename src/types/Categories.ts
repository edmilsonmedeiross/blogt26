export interface DBCategories {
  categoryName: string;
}

export interface TypeCategories {
  categoryName: string;
  checked: boolean;
}

export interface TypeContext {
  categories: TypeCategories[];
  // setCategories: (arg: TypeCategories[]) => void;
}