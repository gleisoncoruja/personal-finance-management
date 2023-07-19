import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const menuActions = [
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
  { icon: <SavingsIcon />, name: "Meta financeira", path: "/" },
  { icon: <AssessmentIcon />, name: "Relatório", path: "/" },
];
