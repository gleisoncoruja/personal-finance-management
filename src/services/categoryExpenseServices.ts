import { ICategory } from "../interfaces/category";
import { mapFields } from "../utils/mapFields";

interface IPostCategoryExpenseProps {
  [key: string]: string | number | boolean | null | undefined;
  name: string;
}

interface IPatchCategoryExpenseProps {
  id: number;
  data: IPostCategoryExpenseProps;
}

function isCategoryExpenseInvalid(
  expenseCategories: IPostCategoryExpenseProps
) {
  const excludeCheck = ["id"];
  for (const key in expenseCategories) {
    if (
      Object.prototype.hasOwnProperty.call(expenseCategories, key) &&
      !excludeCheck.includes(key) &&
      !expenseCategories[key as keyof IPostCategoryExpenseProps]
    ) {
      return key;
    }
  }

  return null;
}

const getCategoryExpenses = () => {
  const storedCategoryExpense: string | null =
    localStorage.getItem("expenseCategories");
  const categoryExpenses: ICategory[] | [] = storedCategoryExpense
    ? (JSON.parse(storedCategoryExpense) as ICategory[])
    : [];
  return categoryExpenses;
};

const deleteCategoryExpense = (id: number) => {
  const categoryExpenses = getCategoryExpenses();
  const updatedCategoryExpenses = categoryExpenses.filter(
    (category) => category.id !== id
  );
  localStorage.setItem(
    "expenseCategories",
    JSON.stringify(updatedCategoryExpenses)
  );
  return updatedCategoryExpenses;
};

const postCategoryExpense = (data: IPostCategoryExpenseProps) => {
  const categoryExpenses = getCategoryExpenses();
  const lastId =
    categoryExpenses.length > 0
      ? categoryExpenses[categoryExpenses.length - 1].id
      : 0;
  const newId = lastId + 1;
  const isInvalidData = isCategoryExpenseInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }

  const newCategoryExpense: ICategory = {
    ...data,
    id: newId,
  };
  categoryExpenses.push(newCategoryExpense);
  localStorage.setItem("expenseCategories", JSON.stringify(categoryExpenses));

  return categoryExpenses;
};

const patchCategoryExpense = ({ id, data }: IPatchCategoryExpenseProps) => {
  const categoryExpenses = getCategoryExpenses();
  const isInvalidData = isCategoryExpenseInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }

  const updatedCategoryExpense: ICategory = {
    ...data,
    id: id,
  };

  const updatedCategoryExpenses = categoryExpenses.map((category) => {
    if (category.id === id) {
      return { ...updatedCategoryExpense };
    }
    return category;
  });

  localStorage.setItem(
    "expenseCategories",
    JSON.stringify(updatedCategoryExpenses)
  );

  return categoryExpenses;
};

export const categoryExpenseServices = {
  getCategoryExpenses,
  postCategoryExpense,
  deleteCategoryExpense,
  patchCategoryExpense,
};
