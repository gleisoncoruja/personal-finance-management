import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExpenseSlice } from "../../interfaces/slices";
import { expenseServices } from "../../services/expenseServices";
import {
  IPostExpenseProps,
  IPatchExpenseProps,
} from "../../interfaces/expenses";

const initialState: IExpenseSlice = {
  expenses: [],
  error: false,
  errorMessage: "",
  success: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    resetExpenseState(state) {
      state.error = false;
      state.success = false;
      state.errorMessage = "";
    },
    getExpenses(state) {
      state.expenses = expenseServices.getExpenses();
      state.error = false;
      state.success = true;
      state.errorMessage = "";
    },
    createExpense(state, action: PayloadAction<IPostExpenseProps>) {
      try {
        const data = action.payload;
        const resp = expenseServices.postExpense(data);
        state.error = false;
        state.success = true;
        state.expenses = resp;
        state.errorMessage = "";
      } catch (error: Error | unknown) {
        const errorMessage =
          error instanceof Error ? error?.message : "Erro ao salvar despesa";
        state.error = true;
        state.success = false;
        state.errorMessage = errorMessage;
      }
    },
    updateExpense(state, action: PayloadAction<IPatchExpenseProps>) {
      try {
        const data = action.payload;
        const resp = expenseServices.patchExpense(data);
        console.log(resp);
        state.error = false;
        state.success = true;
        state.expenses = resp;
        state.errorMessage = "";
      } catch (error: Error | unknown) {
        const errorMessage =
          error instanceof Error ? error?.message : "Erro ao salvar despesa";
        state.error = true;
        state.success = false;
        state.errorMessage = errorMessage;
      }
    },
    deleteExpenses(state, action: PayloadAction<number>) {
      const id = action.payload;
      const resp = expenseServices.deleteExpense(id);
      state.expenses = resp;
      state.error = false;
      state.success = true;
      state.errorMessage = "";
    },
  },
});

export const {
  resetExpenseState,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpenses,
} = expenseSlice.actions;
export default expenseSlice.reducer;
