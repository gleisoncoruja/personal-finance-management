import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HomeIcon from "@mui/icons-material/Home";

export const menuActions = [
  { icon: <HomeIcon />, name: "Página inicial", path: "/" },
  { icon: <AttachMoneyIcon />, name: "Receitas", path: "/income" },
  { icon: <MoneyOffIcon />, name: "Despesas", path: "/expense" },
  {
    icon: <AddCardIcon />,
    name: "Categorias de receitas",
    path: "/income/category",
  },
  {
    icon: <CreditCardOffIcon />,
    name: "Categorias de despesas",
    path: "/expense/category",
  },
  { icon: <AssessmentIcon />, name: "Relatório", path: "/report" },
];
