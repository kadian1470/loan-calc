import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMemo } from "react";
import {
  calculateAmortizationSchedule,
  calculateAmortizationScheduleWithOverridePayment,
  moneyFormatter,
} from "../utils/loanCalculations";
import { Loan } from "../utils/loanReducer";

const toDollar = (value: number) => moneyFormatter.format(value);

type LoanScheduleProps = Readonly<{
  loan: Loan;
}>;

export default function LoanSchedule({ loan }: LoanScheduleProps) {
  const schdule = useMemo(() => {
    if (loan.term) {
      return calculateAmortizationSchedule({
        principal: loan.principal,
        annualInterestRate: loan.interestRate,
        loanTermYears: loan.term / 12,
      });
    }
    if (loan.currentPayment) {
      return calculateAmortizationScheduleWithOverridePayment({
        principal: loan.principal,
        annualInterestRate: loan.interestRate,
        loanTermYears: 60,
        monthlyPayment: loan.currentPayment,
      });
    }
    return [];
  }, [loan]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Balance End of Month</TableCell>
            <TableCell align="right">Interest Payment</TableCell>
            <TableCell align="right">Principal Payment</TableCell>
            <TableCell align="right">Interest Paid</TableCell>
            <TableCell align="right">Balance End of Month</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schdule.map((row) => {
            return (
              <TableRow
                key={row.month}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.month}</TableCell>
                <TableCell align="right">{toDollar(row.balance)}</TableCell>
                <TableCell align="right">{toDollar(row.interest)}</TableCell>
                <TableCell align="right">{toDollar(row.principal)}</TableCell>
                <TableCell align="right">{toDollar(row.payment)}</TableCell>
                <TableCell align="right">
                  {toDollar(row.balance - row.principal)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
