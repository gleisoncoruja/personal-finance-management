import { ExpenseCategoryChart } from "./components/Expenses/ExpenseCategoryChart";
import { IncomeCategoryChart } from "./components/Incomes/IncomesCategoryChart";
import { ReportContainer, ReportContent } from "./style";
import { ChartAccordion } from "./components/ChartAccordion";
import { IncomesLineChart } from "./components/Incomes/IncomesLineChart";
import { ExpenseLineChart } from "./components/Expenses/ExpenseLineChart";
import { BalanceLineChart } from "./components/Balance/BalanceLineChart";

export const Report = () => {
  return (
    <ReportContainer>
      <ChartAccordion title="Receitas">
        <ReportContent>
          <IncomeCategoryChart />
        </ReportContent>
        <ReportContent>
          <IncomesLineChart />
        </ReportContent>
      </ChartAccordion>

      <ChartAccordion title="Despesas">
        <ReportContent>
          <ExpenseCategoryChart />
        </ReportContent>
        <ReportContent>
          <ExpenseLineChart />
        </ReportContent>
      </ChartAccordion>

      <ChartAccordion title="Saldos">
        <ReportContent>
          <BalanceLineChart />
        </ReportContent>
      </ChartAccordion>
    </ReportContainer>
  );
};
