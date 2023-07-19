import { Box, styled } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "25rem",
  padding: "1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#F5F5F5",
  gap: "2rem",
  [theme.breakpoints.down("sm")]: {
    minWidth: "auto",
    width: "90vw",
    padding: "2rem",
  },
}));

export const TitleContent = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ModalContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
});

export const ConfirmButtonContent = styled(Box)({
  display: "flex",
  gap: "1rem",
});
