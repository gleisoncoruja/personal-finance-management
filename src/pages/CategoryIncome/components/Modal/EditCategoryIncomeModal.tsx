import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { categoryIncomeServices } from "../../../../services/categoryIncomeServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CustomModal } from "../../../../components/Modal";
import { ICategory } from "../../../../interfaces/category";

interface IEditCategoryIncomeModalProps {
  open: boolean;
  handleClose: () => void;
  categoryIncomeData: ICategory | undefined;
}

export const EditCategoryIncomeModal = ({
  open,
  handleClose,
  categoryIncomeData,
}: IEditCategoryIncomeModalProps) => {
  const [name, setName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSave = () => {
    const updatedCategoryIncome = {
      name,
    };
    try {
      categoryIncomeServices.patchCategoryIncome({
        id: (categoryIncomeData && categoryIncomeData.id) || 0,
        data: updatedCategoryIncome,
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
      setName((categoryIncomeData && categoryIncomeData.name) || "");
    }
  }, [open, categoryIncomeData]);

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
