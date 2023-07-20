import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ChangeEvent, useState } from "react";
import { NumericFormat } from "react-number-format";
import { SelectChangeEvent } from "@mui/material/Select";
import { CategorySelect } from "../../../../components/Select/CategorySelect";

import { useEffect } from "react";
import { CustomModal } from "../../../../components/Modal";
import { IIncome } from "../../../../interfaces/income";
import { parse } from "date-fns";
import { categoryIncomeServices } from "../../../../services/categoryIncomeServices";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { reset, updateIncome } from "../../../../redux/slices/incomeSlice";
import { toast } from "react-toastify";

interface IEditIncomeModalProps {
  open: boolean;
  handleClose: () => void;
  incomeData: IIncome | undefined;
}

export const EditIncomeModal = ({
  open,
  handleClose,
  incomeData,
}: IEditIncomeModalProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [observation, setObservation] = useState<string | null | undefined>("");
  const [repeat, setRepeat] = useState(false);
  const { error, errorMessage, success } = useAppSelector(
    (state) => state.income
  );

  const categories = categoryIncomeServices.getCategoryIncomes();

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
    const updatedIncome = {
      value,
      categoryId: selectedCategory,
      observation,
      date: selectedDate,
      repeat,
    };
    dispatch(
      updateIncome({
        id: (incomeData && incomeData.id) || 0,
        data: updatedIncome,
      })
    );
  };

  useEffect(() => {
    error && toast.error(errorMessage || "Erro ao salvar receita");
    success && handleClose();

    return () => {
      dispatch(reset());
    };
  }, [error, success]);

  useEffect(() => {
    if (!open) {
      setValue("");
      setSelectedCategory(0);
      setObservation("");
      setSelectedDate("");
      setRepeat(false);
    } else {
      setValue((incomeData && incomeData.value) || "");
      setSelectedCategory((incomeData && incomeData.category.id) || 0);
      setObservation((incomeData && incomeData.observation) || "");
      setSelectedDate((incomeData && String(incomeData.date)) || "");
      setRepeat((incomeData && incomeData.repeat) || false);
    }
  }, [open, incomeData]);

  return (
    <CustomModal handleClose={handleClose} open={open} title="Editar receita">
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
