import { ICategory } from "../interfaces/category";
import { IIncome } from "../interfaces/income";
import { mapFields } from "../utils/mapFields";
import { parse, addMonths, format, getYear } from "date-fns";

interface IPostIncomeProps {
  [key: string]: string | number | boolean | null | undefined;
  categoryId: number;
  value: string;
  observation?: string | null;
  date: string | null;
  repeat: boolean;
}

interface IPatchIncomeProps {
  id: number;
  data: IPostIncomeProps;
}

function isIncomeInvalid(income: IPostIncomeProps) {
  const excludeCheck = ["observation", "categoryId", "repeat"];
  for (const key in income) {
    if (
      Object.prototype.hasOwnProperty.call(income, key) &&
      !excludeCheck.includes(key) &&
      !income[key as keyof IPostIncomeProps]
    ) {
      return key;
    }
  }

  if (income.categoryId !== 0 && !income.categoryId) {
    return "categoryId";
  }

  return null;
}

const getCategories = () => {
  const storedCategories: string | null =
    localStorage.getItem("incomeCategories");

  const categories: ICategory[] | [] = storedCategories
    ? (JSON.parse(storedCategories) as ICategory[])
    : [];

  return categories;
};

const getIncomes = () => {
  const storedIncome: string | null = localStorage.getItem("income");
  const incomes: IIncome[] | [] = storedIncome
    ? (JSON.parse(storedIncome) as IIncome[])
    : [];
  return incomes;
};

const deleteIncome = (id: number) => {
  const incomes = getIncomes();
  const updatedIncomes = incomes.filter((income) => income.id !== id);
  localStorage.setItem("income", JSON.stringify(updatedIncomes));
  return updatedIncomes;
};

const postIncome = (data: IPostIncomeProps) => {
  const incomes = getIncomes();
  const categories = getCategories();
  const lastId = incomes.length > 0 ? incomes[incomes.length - 1].id : 0;
  const newId = lastId + 1;
  const isInvalidData = isIncomeInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }
  const defaultCategory = { id: 0, name: "Outras" };
  const category =
    categories.find(({ id }) => id === data.categoryId) || defaultCategory;
  const newIncome: IIncome = {
    ...data,
    id: newId,
    category,
  };
  incomes.push(newIncome);
  localStorage.setItem("income", JSON.stringify(incomes));

  if (data.repeat) {
    const startDate = data.date
      ? parse(data.date, "dd/MM/yyyy", new Date())
      : new Date();

    let currentDate = startDate;

    while (getYear(currentDate) === getYear(startDate)) {
      const lastId = incomes.length > 0 ? incomes[incomes.length - 1].id : 0;
      const newId = lastId + 1;
      const replicatedObject = {
        ...data,
        category,
        id: newId,
        date: format(currentDate, "dd/MM/yyyy"),
      };
      incomes.push(replicatedObject);
      localStorage.setItem("income", JSON.stringify(incomes));
      currentDate = addMonths(currentDate, 1);
    }
  }

  return incomes;
};

const patchIncome = ({ id, data }: IPatchIncomeProps) => {
  const incomes = getIncomes();
  const incomeDetail = incomes.find((income) => income.id === id);
  const categories = getCategories();
  const isInvalidData = isIncomeInvalid(data);

  if (isInvalidData) {
    throw new Error(`O campo ${mapFields(isInvalidData)} é obrigatório`);
  }
  const defaultCategory = { id: 0, name: "Outras" };
  const category =
    categories.find(({ id }) => id === data.categoryId) || defaultCategory;
  const updatedIncome: IIncome = {
    ...data,
    id: id,
    category,
  };
  const updatedIncomes = incomes.map((income) => {
    if (income.id === id) {
      return { ...updatedIncome };
    }
    return income;
  });

  localStorage.setItem("income", JSON.stringify(updatedIncomes));

  if (incomeDetail && !incomeDetail.repeat && data.repeat) {
    const startDate = data.date
      ? parse(data.date, "dd/MM/yyyy", new Date())
      : new Date();

    let currentDate = startDate;

    while (getYear(currentDate) === getYear(startDate)) {
      const lastId = incomes.length > 0 ? incomes[incomes.length - 1].id : 0;
      const newId = lastId + 1;
      const replicatedObject = {
        ...data,
        category,
        id: newId,
        date: format(currentDate, "dd/MM/yyyy"),
      };
      incomes.push(replicatedObject);
      localStorage.setItem("income", JSON.stringify(incomes));
      currentDate = addMonths(currentDate, 1);
    }
  }

  return incomes;
};

export const incomeServices = {
  getCategories,
  getIncomes,
  postIncome,
  deleteIncome,
  patchIncome,
};
