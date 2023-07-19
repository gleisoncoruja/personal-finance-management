import {
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableContainer } from "./style";
import { IIncome } from "../../interfaces/income";
import { ConfirmDeleteModal } from "../Modal/ConfirmDeleteModal";
import { useState } from "react";

interface IIncomeProps {
  incomeData: IIncome[] | [];
  handleDelete: (id: number) => void;
  handleOpenEditModal: (id: number) => void;
}
export const IncomeExpensesTable = ({
  incomeData,
  handleDelete,
  handleOpenEditModal,
}: IIncomeProps) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [id, setId] = useState(0);

  const handleOpenConfirmDelete = (dataId: number) => {
    setId(dataId);
    setOpenConfirmDelete(true);
  };
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Observação</TableCell>
            <TableCell>Repetir</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeData?.map((income) => (
            <TableRow key={income.id}>
              <TableCell>{income.date}</TableCell>
              <TableCell>{income.value}</TableCell>
              <TableCell>{income.category.name}</TableCell>
              <TableCell>{income.observation}</TableCell>
              <TableCell>{income.repeat ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenEditModal(income.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenConfirmDelete(income.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDeleteModal
        handleClose={handleCloseConfirmDelete}
        open={openConfirmDelete}
        handleConfirm={() => handleDelete(id)}
      />
    </StyledTableContainer>
  );
};
