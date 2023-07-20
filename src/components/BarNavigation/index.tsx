import { AppBar, Box, Toolbar } from "@mui/material";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { HeaderContent, StyledSpeedDial } from "./style";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { menuActions } from "./components/MenuIcons";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getIncomes } from "../../redux/slices/incomeSlice";
import { useEffect, useMemo } from "react";
import { getExpenses } from "../../redux/slices/expenseSlice";
import { convertToNumber } from "../../utils/convertToNumber";
import { TitleNavBar } from "./components/TitleNavBar";
import { BalanceInfo } from "./components/BalanceInfo";

export const BarNavigation = () => {
  const { incomes } = useAppSelector((state) => state.income);
  const { expenses } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleOptionClick = (path: string) => {
    navigate(path);
  };

  interface IBalances {
    balance: number;
    balanceText: string;
  }

  const { balance, balanceText }: IBalances = useMemo(() => {
    const totalIncome = incomes?.reduce(
      (sum, income) => (sum = sum + convertToNumber(income.value)),
      0
    );
    const totalExpense = expenses?.reduce(
      (sum, expense) => (sum = sum + convertToNumber(expense.value)),
      0
    );
    const balance = totalIncome - totalExpense;
    const balanceText = balance.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return { balance, balanceText };
  }, [incomes, expenses]);

  useEffect(() => {
    dispatch(getIncomes());
    dispatch(getExpenses());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<MenuIcon />}
            direction={"down"}
          >
            {menuActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleOptionClick(action.path)}
              />
            ))}
          </StyledSpeedDial>
          <HeaderContent>
            <TitleNavBar />
            <BalanceInfo balance={balance} balanceText={balanceText} />
          </HeaderContent>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
