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
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  createExpense,
  resetExpenseState,
} from "../../../../redux/slices/expenseSlice";

interface ICreateExpenseProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateExpenseModal = ({
  open,
  handleClose,
}: ICreateExpenseProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>("");
  const [observation, setObservation] = useState<string | null>("");
  const [repeat, setRepeat] = useState(false);
  const { error, errorMessage, success } = useAppSelector(
    (state) => state.expense
  );

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
    setSelectedDate(formattedDate);
  };

  const handleSave = () => {
    const newExpense = {
      value,
      categoryId: selectedCategory,
      observation,
      date: selectedDate,
      repeat,
    };
    dispatch(createExpense(newExpense));
  };
  useEffect(() => {
    error && toast.error(errorMessage || "Erro ao salvar despesa");
    success && handleClose();

    return () => {
      dispatch(resetExpenseState());
    };
  }, [error, success]);

  useEffect(() => {
    setValue("");
    setSelectedCategory(0);
    setObservation("");
    setSelectedDate("");
    setRepeat(false);
  }, [open]);

  return (
    <CustomModal handleClose={handleClose} open={open} title="Nova despesa">
      <DatePicker onChange={handleSelectDate} />
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
