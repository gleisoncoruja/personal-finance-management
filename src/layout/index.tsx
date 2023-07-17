import { Container } from "@mui/material";
import { BarNavigation } from "../components/BarNavigation";
import { Outlet } from "react-router-dom";
import { MainContent } from "./style";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export const MainLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters={true}>
        <BarNavigation />
        <MainContent elevation={3}>
          <Outlet />
        </MainContent>
      </Container>
    </ThemeProvider>
  );
};
