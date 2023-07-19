import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
export const AutoCompleteMonths = () => {
  const months = [
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
  return (
    <Autocomplete
      disablePortal
      id="combo-month"
      options={months}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Mês" />}
    />
  );
};
