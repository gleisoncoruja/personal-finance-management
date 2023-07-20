import {
  AddButtonContent,
  AutoCompleteContent,
  ExpenseContainer,
} from "./style";
import { IncomeExpensesTable } from "../../components/Tables/IncomeExpensesTable";
import { AutoCompleteMonths } from "../../components/AutoComplete/Months";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { CreateExpenseModal } from "./components/Modal/CreateExpenseModal";
import { useEffect, useState } from "react";
import { expenseServices } from "../../services/expenseServices";
import { EditExpenseModal } from "./components/Modal/EditExpenseModal";
import { IMonths } from "../../interfaces/months";
import { getMonth, parse } from "date-fns";
import { IExpense } from "../../interfaces/expenses";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deleteExpenses,
  getExpenses,
  resetExpenseState,
} from "../../redux/slices/expenseSlice";

const StyledFab = styled(Fab)({
  position: "relative",
  zIndex: 1,
});

export const Expense = () => {
  const dispatch = useAppDispatch();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [expensesData, setExpensesData] = useState<IExpense[] | []>([]);
  const [detailExpense, setDetailExpense] = useState<IExpense>();
  const [selectedMonth, setSelectedMonth] = useState<IMonths | null>(null);
  const { expenses } = useAppSelector((state) => state.expense);

  const handleOpenCreateModal = () => {
    dispatch(resetExpenseState());
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteExpenses(id));
  };

  const handleOpenEditModal = (id: number) => {
    const expense = expenses.find((expense) => expense.id === id);
    dispatch(resetExpenseState());
    setDetailExpense(expense);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setDetailExpense(undefined);
    setOpenEditModal(false);
  };

  const handleFilter = (value: IMonths | null) => {
    const expenses = expenseServices.getExpenses();
    const expensesFiltered = expenses.filter((expense: IExpense) => {
      const dateExpense =
        expense.date && parse(expense.date, "dd/MM/yyyy", new Date());
      const month = dateExpense && getMonth(dateExpense);

      return month === value?.id ?? 0;
    });
    setSelectedMonth(value);

    setExpensesData(value?.name ? expensesFiltered : expenses);
  };

  useEffect(() => {
    setExpensesData(expenses);
  }, [expenses]);

  useEffect(() => {
    dispatch(getExpenses());
    return () => {
      dispatch(resetExpenseState());
    };
  }, []);
  return (
    <ExpenseContainer>
      <AutoCompleteContent>
        <AutoCompleteMonths handleChange={handleFilter} value={selectedMonth} />
      </AutoCompleteContent>
      <IncomeExpensesTable
        tableData={expensesData}
        handleDelete={handleDelete}
        handleOpenEditModal={handleOpenEditModal}
      />
      <AddButtonContent>
        <StyledFab
          color="secondary"
          aria-label="add"
          onClick={handleOpenCreateModal}
        >
          <AddIcon />
        </StyledFab>
      </AddButtonContent>
      <CreateExpenseModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <EditExpenseModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        expenseData={detailExpense}
      />
    </ExpenseContainer>
  );
};
