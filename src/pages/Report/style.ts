import { Accordion, Box, styled } from "@mui/material";

export const ReportContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "80vh",
  gap: "1rem",
});

export const ReportContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "1rem",
});

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  "& .MuiButtonBase-root.MuiAccordionSummary-root:hover": {
    transition: "background-color 0.3s ease-in-out",
    backgroundColor: theme.palette.primary.light,
    color: "#FFF",
    "& svg": {
      color: "#E5ECD1",
    },
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded ": {
    transition: "background-color 0.5s ease-in-out",
    backgroundColor: theme.palette.primary.dark,
    color: "#FFF",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded ": {
    "& svg": {
      color: "#E5ECD1",
    },
  },
}));
