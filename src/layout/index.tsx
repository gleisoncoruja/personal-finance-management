import { BarNavigation } from "../components/BarNavigation";
import { Outlet } from "react-router-dom";
import { MainContainer, MainContent } from "./style";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ptLocale from "date-fns/locale/pt-BR";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export const MainLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ptLocale}
      >
        <MainContainer disableGutters={true}>
          <BarNavigation />
          <MainContent elevation={3}>
            <Outlet />
          </MainContent>
          <ToastContainer />
        </MainContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
