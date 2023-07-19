import { AddButtonContent, CategoryExpenseContainer, StyledFab } from "./style";
import { CategoryTable } from "../../components/Tables/CategoryTable";
import AddIcon from "@mui/icons-material/Add";
import { CreateCategoryExpenseModal } from "./components/Modal/CreateCategoryExpenseModal";
import { useEffect, useState } from "react";
import { categoryExpenseServices } from "../../services/categoryExpenseServices";
import { ICategory } from "../../interfaces/category";
import { EditCategoryExpenseModal } from "./components/Modal/EditCategoryExpenseModal";

export const CategoryExpense = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [categoryExpenses, setCategoryExpenses] = useState<ICategory[] | []>(
    []
  );
  const [detailCategoryExpense, setDetailCategoryExpense] =
    useState<ICategory>();

  const getCategoryExpenses = () => {
    const data = categoryExpenseServices.getCategoryExpenses();
    setCategoryExpenses(data);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleDelete = (id: number) => {
    const updatedCategoryExpenses =
      categoryExpenseServices.deleteCategoryExpense(id);
    setCategoryExpenses(updatedCategoryExpenses);
  };

  const handleOpenEditModal = (id: number) => {
    const categoryExpense = categoryExpenses.find(
      (categoryExpense) => categoryExpense.id === id
    );
    setDetailCategoryExpense(categoryExpense);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setDetailCategoryExpense(undefined);
    setOpenEditModal(false);
  };

  useEffect(() => {
    getCategoryExpenses();
  }, [openEditModal, openCreateModal]);
  return (
    <CategoryExpenseContainer>
      <CategoryTable
        tableData={categoryExpenses}
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
      <CreateCategoryExpenseModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <EditCategoryExpenseModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        categoryExpenseData={detailCategoryExpense}
      />
    </CategoryExpenseContainer>
  );
};
