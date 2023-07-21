import { BarNavigation } from "../components/BarNavigation";
import { Outlet } from "react-router-dom";
import { MainContainer, MainContent } from "./style";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ptLocale from "date-fns/locale/pt-BR";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const theme = createTheme();
const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 2 },
  },
};

export const MainLayout = () => {
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ptLocale}
      >
        <MainContainer disableGutters={true}>
          <BarNavigation />
          <MainContent elevation={3}>
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Outlet />
            </motion.div>
          </MainContent>
          <ToastContainer />
        </MainContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
