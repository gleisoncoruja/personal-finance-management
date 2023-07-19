import { Box, styled } from "@mui/material";

export const ExpenseContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "80vh",
  gap: "1rem",
});

export const AutoCompleteContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  [theme.breakpoints.down("sm")]: {
    marginTop: "2rem",
    justifyContent: "center",
  },
}));

export const AddButtonContent = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  flex: 1,
  flexGrow: 1,
  bottom: 0,
});
