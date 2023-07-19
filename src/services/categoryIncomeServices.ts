import { ICategory } from "../interfaces/category";
import { mapFields } from "../utils/mapFields";

interface IPostCategoryIncomeProps {
  [key: string]: string | number | boolean | null | undefined;
  name: string;
}

interface IPatchCategoryIncomeProps {
  id: number;
  data: IPostCategoryIncomeProps;
}

function isCategoryIncomeInvalid(incomeCategories: IPostCategoryIncomeProps) {
  const excludeCheck = ["id"];
  for (const key in incomeCategories) {
    if (
      Object.prototype.hasOwnProperty.call(incomeCategories, key) &&
      !excludeCheck.includes(key) &&
      !incomeCategories[key as keyof IPostCategoryIncomeProps]
    ) {
      return key;
    }
  }

  return null;
}

const getCategoryIncomes = () => {
  const storedCategoryIncome: string | null =
    localStorage.getItem("incomeCategories");
  const categoryIncomes: ICategory[] | [] = storedCategoryIncome
    ? (JSON.parse(storedCategoryIncome) as ICategory[])
    : [];
  return categoryIncomes;
};

const deleteCategoryIncome = (id: number) => {
  const categoryIncomes = getCategoryIncomes();
  const updatedCategoryIncomes = categoryIncomes.filter(
    (category) => category.id !== id
  );
  localStorage.setItem(
    "incomeCategories",
    JSON.stringify(updatedCategoryIncomes)
  );
  return updatedCategoryIncomes;
};

const postCategoryIncome = (data: IPostCategoryIncomeProps) => {
  const categoryIncomes = getCategoryIncomes();
  const lastId =
    categoryIncomes.length > 0
      ? categoryIncomes[categoryIncomes.length - 1].id
      : 0;
  const newId = lastId + 1;
  const isInvalidData = isCategoryIncomeInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }

  const newCategoryIncome: ICategory = {
    ...data,
    id: newId,
  };
  categoryIncomes.push(newCategoryIncome);
  localStorage.setItem("incomeCategories", JSON.stringify(categoryIncomes));

  return categoryIncomes;
};

const patchCategoryIncome = ({ id, data }: IPatchCategoryIncomeProps) => {
  const categoryIncomes = getCategoryIncomes();
  const isInvalidData = isCategoryIncomeInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }

  const updatedCategoryIncome: ICategory = {
    ...data,
    id: id,
  };

  const updatedCategoryIncomes = categoryIncomes.map((category) => {
    if (category.id === id) {
      return { ...updatedCategoryIncome };
    }
    return category;
  });

  localStorage.setItem(
    "incomeCategories",
    JSON.stringify(updatedCategoryIncomes)
  );

  return categoryIncomes;
};

export const categoryIncomeServices = {
  getCategoryIncomes,
  postCategoryIncome,
  deleteCategoryIncome,
  patchCategoryIncome,
};
