import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IMonths } from "../../interfaces/months";

interface IAutocompleteProps {
  handleChange: (newValue: IMonths | null) => void;
  value: IMonths | null;
}

const months: IMonths[] = [
  { id: 0, name: "Janeiro" },
  { id: 1, name: "Fevereiro" },
  { id: 2, name: "Março" },
  { id: 3, name: "Abril" },
  { id: 4, name: "Maio" },
  { id: 5, name: "Junho" },
  { id: 6, name: "Julho" },
  { id: 7, name: "Agosto" },
  { id: 8, name: "Setembro" },
  { id: 9, name: "Outubro" },
  { id: 10, name: "Novembro" },
  { id: 11, name: "Dezembro" },
];
export const AutoCompleteMonths = ({
  handleChange,
  value,
}: IAutocompleteProps) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-month"
      value={value}
      options={months}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      onChange={(_, newValue: IMonths | null) => {
        handleChange(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Mês" />}
    />
  );
};
