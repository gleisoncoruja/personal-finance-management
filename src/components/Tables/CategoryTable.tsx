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
import { ConfirmDeleteModal } from "../Modal/ConfirmDeleteModal";
import { useState } from "react";
import { ICategory } from "../../interfaces/category";

interface CategoryTableProps {
  tableData: ICategory[] | [];
  handleDelete: (id: number) => void;
  handleOpenEditModal: (id: number) => void;
}
export const CategoryTable = ({
  tableData,
  handleDelete,
  handleOpenEditModal,
}: CategoryTableProps) => {
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
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((income) => (
            <TableRow key={income.id}>
              <TableCell>{income.id}</TableCell>
              <TableCell>{income.name}</TableCell>
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
