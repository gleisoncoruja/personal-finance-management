import { Paper, Theme } from "@mui/material";
import styled from "@mui/styled-engine";
interface MainContentProps {
  theme?: Theme;
}

export const MainContent = styled(Paper)<MainContentProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "70vh",
  flexGrow: 1,
  flex: 1,
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem",
    flexGrow: 1,
  },
}));
