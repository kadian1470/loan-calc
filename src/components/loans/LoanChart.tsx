import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLoanOptionsContext } from "../../context/LoanOptionsContext";
import {
  calculateAmortizationSchedule,
  calculateAmortizationScheduleWithOverridePayment,
  toDollar,
} from "../../utils/loanCalculations";
import { Loan } from "../../utils/loanReducer";

const colors = [
  "#FF5733", // Bright Orange
  "#33C1FF", // Light Blue
  "#FFBD33", // Gold
  "#33FFBD", // Light Green
  "#FF33A6", // Hot Pink
  "#33FF57", // Lime Green
  "#FF3381", // Magenta
  "#3381FF", // Sky Blue
  "#FF5733", // Bright Orange
  "#3357FF", // Royal Blue
];

export type LoanChartProps = Readonly<{
  loans: Loan[];
}>;

export default function LoanChart({ loans }: LoanChartProps) {
  const { useTerm, paymentType } = useLoanOptionsContext();
  const data = useMemo(() => {
    const schedules = loans.map((loan) => {
      if (useTerm && loan.term) {
        return calculateAmortizationSchedule({
          principal: loan.principal,
          annualInterestRate: loan.interestRate,
          loanTermYears: loan.term / 12,
        });
      }

      let payment = loan.minimumPayment;
      if (paymentType === "current" && loan.currentPayment) {
        payment = loan.currentPayment;
      }

      return calculateAmortizationScheduleWithOverridePayment({
        principal: loan.principal,
        annualInterestRate: loan.interestRate,
        loanTermYears: loan.term ?? 60,
        monthlyPayment: payment,
      });
    });
    const result = [];
    const sortSchedules = schedules.sort((a, b) => {
      return b.length - a.length;
    });
    for (let i = 0; i < sortSchedules[0].length; i += 1) {
      const monthResult: { [key: string]: string | number } = {
        month: i + 1,
      };
      for (let j = 0; j < sortSchedules.length; j += 1) {
        if (i < sortSchedules[j].length) {
          monthResult[loans[j].name] = sortSchedules[j][i].balance;
        } else {
          monthResult[loans[j].name] = 0;
        }
      }
      result.push(monthResult);
    }
    return result;
  }, [loans, paymentType, useTerm]);
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={toDollar} />
        <Tooltip formatter={toDollar} />
        <Legend />
        {loans.map((loan, i) => {
          return (
            <Bar
              key={loan.name}
              dataKey={loan.name}
              stackId="a"
              fill={colors[i]}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
