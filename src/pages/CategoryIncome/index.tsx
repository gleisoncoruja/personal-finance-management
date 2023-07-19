import { AddButtonContent, CategoryIncomeContainer, StyledFab } from "./style";
import { CategoryTable } from "../../components/Tables/CategoryTable";
import AddIcon from "@mui/icons-material/Add";
import { CreateCategoryIncomeModal } from "./components/Modal/CreateCategoryIncomeModal";
import { useEffect, useState } from "react";
import { categoryIncomeServices } from "../../services/categoryIncomeServices";
import { ICategory } from "../../interfaces/category";
import { EditCategoryIncomeModal } from "./components/Modal/EditCategoryIncomeModal";

export const CategoryIncome = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [categoryIncomes, setCategoryIncomes] = useState<ICategory[] | []>([]);
  const [detailCategoryIncome, setDetailCategoryIncome] = useState<ICategory>();

  const getCategoryIncomes = () => {
    const data = categoryIncomeServices.getCategoryIncomes();
    setCategoryIncomes(data);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleDelete = (id: number) => {
    const updatedCategoryIncomes =
      categoryIncomeServices.deleteCategoryIncome(id);
    setCategoryIncomes(updatedCategoryIncomes);
  };

  const handleOpenEditModal = (id: number) => {
    const categoryIncome = categoryIncomes.find(
      (categoryIncome) => categoryIncome.id === id
    );
    setDetailCategoryIncome(categoryIncome);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setDetailCategoryIncome(undefined);
    setOpenEditModal(false);
  };

  useEffect(() => {
    getCategoryIncomes();
  }, [openEditModal, openCreateModal]);
  return (
    <CategoryIncomeContainer>
      <CategoryTable
        tableData={categoryIncomes}
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
      <CreateCategoryIncomeModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <EditCategoryIncomeModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        categoryIncomeData={detailCategoryIncome}
      />
    </CategoryIncomeContainer>
  );
};
