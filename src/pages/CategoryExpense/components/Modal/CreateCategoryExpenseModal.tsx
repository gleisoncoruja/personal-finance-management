import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { categoryExpenseServices } from "../../../../services/categoryExpenseServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CustomModal } from "../../../../components/Modal";

interface ICreateCategoryExpenseProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateCategoryExpenseModal = ({
  open,
  handleClose,
}: ICreateCategoryExpenseProps) => {
  const [name, setName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSave = () => {
    const newCategoryExpense = {
      name,
    };
    try {
      categoryExpenseServices.postCategoryExpense(newCategoryExpense);
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error?.message : "Erro ao salvar categoria";
      toast.error(errorMessage);
      return;
    }
    handleClose();
  };

  useEffect(() => {
    setName("");
  }, [open]);

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
