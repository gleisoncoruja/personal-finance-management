import { Paper, Theme, Container } from "@mui/material";
import styled from "@mui/styled-engine";
interface MainContentProps {
  theme?: Theme;
}

export const MainContainer = styled(Container)({
  "&.MuiContainer-root": {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  "& .MuiBox-root": {
    flexGrow: 0,
  },
});

export const MainContent = styled(Paper)<MainContentProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem",
    flexGrow: 1,
    minHeight: "auto",
  },
}));
