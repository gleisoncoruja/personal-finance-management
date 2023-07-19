import { ICategory } from "../interfaces/category";
import { IExpense } from "../interfaces/expenses";

import { mapFields } from "../utils/mapFields";
import { parse, addMonths, format, getYear } from "date-fns";

interface IPostExpenseProps {
  [key: string]: string | number | boolean | null | undefined;
  categoryId: number;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}

interface IPatchExpenseProps {
  id: number;
  data: IPostExpenseProps;
}

function isExpenseInvalid(expense: IPostExpenseProps) {
  const excludeCheck = ["observation", "categoryId", "repeat"];
  for (const key in expense) {
    if (
      Object.prototype.hasOwnProperty.call(expense, key) &&
      !excludeCheck.includes(key) &&
      !expense[key as keyof IPostExpenseProps]
    ) {
      return key;
    }
  }

  if (expense.categoryId !== 0 && !expense.categoryId) {
    return "categoryId";
  }

  return null;
}

const getCategories = () => {
  const storedCategories: string | null =
    localStorage.getItem("expenseCategories");

  const categories: ICategory[] | [] = storedCategories
    ? (JSON.parse(storedCategories) as ICategory[])
    : [];

  return categories;
};

const getExpenses = () => {
  const storedExpense: string | null = localStorage.getItem("expense");
  const expenses: IExpense[] | [] = storedExpense
    ? (JSON.parse(storedExpense) as IExpense[])
    : [];
  return expenses;
};

const deleteExpense = (id: number) => {
  const expenses = getExpenses();
  const updatedExpenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expense", JSON.stringify(updatedExpenses));
  return updatedExpenses;
};

const postExpense = (data: IPostExpenseProps) => {
  const expenses = getExpenses();
  const categories = getCategories();
  const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : 0;
  const newId = lastId + 1;
  const isInvalidData = isExpenseInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }
  const defaultCategory = { id: 0, name: "Outras" };
  const category =
    categories.find(({ id }) => id === data.categoryId) || defaultCategory;
  const newExpense: IExpense = {
    ...data,
    id: newId,
    category,
  };
  expenses.push(newExpense);
  localStorage.setItem("expense", JSON.stringify(expenses));

  if (data.repeat) {
    const startDate = data.date
      ? parse(data.date, "dd/MM/yyyy", new Date())
      : new Date();

    let currentDate = startDate;

    while (getYear(currentDate) === getYear(startDate)) {
      const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : 0;
      const newId = lastId + 1;
      const replicatedObject = {
        ...data,
        category,
        id: newId,
        date: format(currentDate, "dd/MM/yyyy"),
      };
      expenses.push(replicatedObject);
      localStorage.setItem("expense", JSON.stringify(expenses));
      currentDate = addMonths(currentDate, 1);
    }
  }

  return expenses;
};

const patchExpense = ({ id, data }: IPatchExpenseProps) => {
  const expenses = getExpenses();
  const expenseDetail = expenses.find((expense) => expense.id === id);
  const categories = getCategories();
  const isInvalidData = isExpenseInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }
  const defaultCategory = { id: 0, name: "Outras" };
  const category =
    categories.find(({ id }) => id === data.categoryId) || defaultCategory;
  const updatedExpense: IExpense = {
    ...data,
    id: id,
    category,
  };
  const updatedExpenses = expenses.map((expense) => {
    if (expense.id === id) {
      return { ...updatedExpense };
    }
    return expense;
  });

  localStorage.setItem("expense", JSON.stringify(updatedExpenses));

  if (expenseDetail && !expenseDetail.repeat && data.repeat) {
    const startDate = data.date
      ? parse(data.date, "dd/MM/yyyy", new Date())
      : new Date();

    let currentDate = startDate;

    while (getYear(currentDate) === getYear(startDate)) {
      const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : 0;
      const newId = lastId + 1;
      const replicatedObject = {
        ...data,
        category,
        id: newId,
        date: format(currentDate, "dd/MM/yyyy"),
      };
      expenses.push(replicatedObject);
      localStorage.setItem("expense", JSON.stringify(expenses));
      currentDate = addMonths(currentDate, 1);
    }
  }

  return expenses;
};

export const expenseServices = {
  getCategories,
  getExpenses,
  postExpense,
  deleteExpense,
  patchExpense,
};
