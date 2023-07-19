import {
  AddButtonContent,
  AutoCompleteContent,
  IncomeContainer,
} from "./style";
import { IncomeExpensesTable } from "../../components/Tables/IncomeExpensesTable";
import { AutoCompleteMonths } from "../../components/AutoComplete/Months";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { CreateIncomeModal } from "./components/Modal/CreateIncomeModal";
import { useEffect, useState } from "react";
import { incomeServices } from "../../services/incomeServices";
import { IIncome } from "../../interfaces/income";
import { EditIncomeModal } from "./components/Modal/EditIncomeModal";

const StyledFab = styled(Fab)({
  position: "relative",
  zIndex: 1,
});

export const Income = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [incomes, setIncomes] = useState<IIncome[] | []>([]);
  const [detailIncome, setDetailIncome] = useState<IIncome>();

  const getIncomes = () => {
    const data = incomeServices.getIncomes();
    setIncomes(data);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleDelete = (id: number) => {
    const updatedIncomes = incomeServices.deleteIncome(id);
    setIncomes(updatedIncomes);
  };

  const handleOpenEditModal = (id: number) => {
    const income = incomes.find((income) => income.id === id);
    setDetailIncome(income);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setDetailIncome(undefined);
    setOpenEditModal(false);
  };

  useEffect(() => {
    getIncomes();
  }, [openEditModal, openCreateModal]);
  return (
    <IncomeContainer>
      <AutoCompleteContent>
        <AutoCompleteMonths />
      </AutoCompleteContent>
      <IncomeExpensesTable
        incomeData={incomes}
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
      <CreateIncomeModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <EditIncomeModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        incomeData={detailIncome}
      />
    </IncomeContainer>
  );
};
