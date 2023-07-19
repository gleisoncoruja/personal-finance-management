import { styled, TableContainer } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  height: "60vh",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "9px",
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.info.main,
    borderRadius: "4px",
  },
}));
