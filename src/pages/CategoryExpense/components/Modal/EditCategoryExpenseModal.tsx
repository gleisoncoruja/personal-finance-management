import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { categoryExpenseServices } from "../../../../services/categoryExpenseServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CustomModal } from "../../../../components/Modal";
import { ICategory } from "../../../../interfaces/category";

interface IEditCategoryExpenseModalProps {
  open: boolean;
  handleClose: () => void;
  categoryExpenseData: ICategory | undefined;
}

export const EditCategoryExpenseModal = ({
  open,
  handleClose,
  categoryExpenseData,
}: IEditCategoryExpenseModalProps) => {
  const [name, setName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSave = () => {
    const updatedCategoryExpense = {
      name,
    };
    try {
      categoryExpenseServices.patchCategoryExpense({
        id: (categoryExpenseData && categoryExpenseData.id) || 0,
        data: updatedCategoryExpense,
      });
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error?.message : "Erro ao salvar categoria";
      toast.error(errorMessage);
      return;
    }
    handleClose();
  };

  useEffect(() => {
    if (!open) {
      setName("");
    } else {
      setName((categoryExpenseData && categoryExpenseData.name) || "");
    }
  }, [open, categoryExpenseData]);

  return (
    <CustomModal handleClose={handleClose} open={open} title="Nova categoria">
      <TextField
        variant="outlined"
        label="Nome"
        value={name}
        onChange={handleChange}
      />

      <Button variant="contained" onClick={handleSave}>
        Salvar
      </Button>
    </CustomModal>
  );
};
