import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ChangeEvent, useState } from "react";
import { NumericFormat } from "react-number-format";
import { SelectChangeEvent } from "@mui/material/Select";
import { CategorySelect } from "../../../../components/Select/CategorySelect";
import { expenseServices } from "../../../../services/expenseServices";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CustomModal } from "../../../../components/Modal";
import { IExpense } from "../../../../interfaces/expenses";
import { parse } from "date-fns";

interface IEditExpenseModalProps {
  open: boolean;
  handleClose: () => void;
  expenseData: IExpense | undefined;
}

export const EditExpenseModal = ({
  open,
  handleClose,
  expenseData,
}: IEditExpenseModalProps) => {
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [observation, setObservation] = useState<string | null | undefined>("");
  const [repeat, setRepeat] = useState(false);

  const categories = expenseServices.getCategories();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setValue(value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(Number(event.target.value));
  };

  const handleSelectDate = (date: Date | null) => {
    const formattedDate = date && new Date(date).toLocaleDateString();
    setSelectedDate(formattedDate || "");
  };

  const handleSave = () => {
    const updatedExpense = {
      value,
      categoryId: selectedCategory,
      observation,
      date: selectedDate,
      repeat,
    };
    try {
      expenseServices.patchExpense({
        id: (expenseData && expenseData.id) || 0,
        data: updatedExpense,
      });
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error?.message : "Erro ao salvar receita";
      toast.error(errorMessage);
      return;
    }
    handleClose();
  };

  useEffect(() => {
    if (!open) {
      setValue("");
      setSelectedCategory(0);
      setObservation("");
      setSelectedDate("");
      setRepeat(false);
    } else {
      setValue((expenseData && expenseData.value) || "");
      setSelectedCategory((expenseData && expenseData.category.id) || 0);
      setObservation((expenseData && expenseData.observation) || "");
      setSelectedDate((expenseData && String(expenseData.date)) || "");
      setRepeat((expenseData && expenseData.repeat) || false);
    }
  }, [open, expenseData]);

  return (
    <CustomModal handleClose={handleClose} open={open} title="Nova receita">
      <DatePicker
        onChange={handleSelectDate}
        value={parse(selectedDate, "dd/MM/yyyy", new Date())}
      />
      <NumericFormat
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        allowNegative={false}
        allowLeadingZeros={false}
        customInput={TextField}
        onValueChange={(values) => {
          setValue(values.value);
        }}
        label="Valor"
        onChange={handleChange}
      />
      <CategorySelect
        value={selectedCategory}
        handleChange={handleCategoryChange}
        categories={categories}
      />
      <TextField
        variant="outlined"
        label="Observação (opcional)"
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
      />
      <FormControlLabel
        control={
          <Switch
            color="primary"
            onChange={(e) => setRepeat(e.target.checked)}
          />
        }
        label="Repetir"
        labelPlacement="start"
      />
      <Button variant="contained" onClick={handleSave}>
        Salvar
      </Button>
    </CustomModal>
  );
};
