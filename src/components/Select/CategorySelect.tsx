import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { ICategory } from "../../interfaces/category";

interface ICategorySelectProps {
  value: number;
  handleChange: (event: SelectChangeEvent) => void;
  categories: ICategory[] | [];
}
export const CategorySelect = ({
  value,
  handleChange,
  categories,
}: ICategorySelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={String(value)}
        label="Categoria"
        onChange={handleChange}
      >
        <MenuItem value={0}>Outras</MenuItem>
        {categories?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
