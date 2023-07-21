import { Paper, styled } from "@mui/material";

export const StyledTableContainer = styled(Paper)(({ theme }) => ({
  height: "60vh",
  padding: "1rem",
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
