import { Link, useLocation } from "react-router-dom";
import { TitleContent } from "../../style";
import { Typography } from "@mui/material";

export const TitleNavBar = () => {
  const location = useLocation();
  const title: string =
    {
      "/": "Gerenciar finanças",
      "/income": "Receitas",
      "/expense": "Despesas",
      "/income/category": "Categoria de receitas",
      "/expense/category": "Categoria de despesas",
      "/financial-goal": "Metas financeiras",
      "/report": "Relatórios",
    }[location.pathname] || "";
  return (
    <TitleContent>
      <Typography variant="subtitle1">
        <Link to={"/"}>{title}</Link>
      </Typography>
    </TitleContent>
  );
};
