import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIncomeSlice } from "../../interfaces/slices";
import { incomeServices } from "../../services/incomeServices";
import { IPatchIncomeProps, IPostIncomeProps } from "../../interfaces/income";

const initialState: IIncomeSlice = {
  incomes: [],
  error: false,
  errorMessage: "",
  success: false,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    reset(state) {
      state.error = false;
      state.success = false;
      state.errorMessage = "";
    },
    getIncomes(state) {
      state.incomes = incomeServices.getIncomes();
      state.error = false;
      state.success = true;
      state.errorMessage = "";
    },
    createIncome(state, action: PayloadAction<IPostIncomeProps>) {
      try {
        const data = action.payload;
        const resp = incomeServices.postIncome(data);
        state.error = false;
        state.success = true;
        state.incomes = resp;
        state.errorMessage = "";
      } catch (error: Error | unknown) {
        const errorMessage =
          error instanceof Error ? error?.message : "Erro ao salvar receita";
        state.error = true;
        state.success = false;
        state.errorMessage = errorMessage;
      }
    },
    updateIncome(state, action: PayloadAction<IPatchIncomeProps>) {
      try {
        const data = action.payload;
        const resp = incomeServices.patchIncome(data);
        state.error = false;
        state.success = true;
        state.incomes = resp;
        state.errorMessage = "";
      } catch (error: Error | unknown) {
        const errorMessage =
          error instanceof Error ? error?.message : "Erro ao salvar receita";
        state.error = true;
        state.success = false;
        state.errorMessage = errorMessage;
      }
    },
    deleteIncomes(state, action: PayloadAction<number>) {
      const id = action.payload;
      const resp = incomeServices.deleteIncome(id);
      state.incomes = resp;
      state.error = false;
      state.success = true;
      state.errorMessage = "";
    },
  },
});

export const { reset, getIncomes, createIncome, updateIncome, deleteIncomes } =
  incomeSlice.actions;
export default incomeSlice.reducer;
