import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { startOfMonth } from "date-fns";
import { addMonths } from "date-fns/addMonths";
import { format } from "date-fns/format";
import { useMemo } from "react";
import {
  AmortizationScheduleEntry,
  toDollar,
} from "../../utils/loanCalculations";

type SumAmortizationScheduleEntry = AmortizationScheduleEntry &
  Readonly<{
    currentInterest: number;
  }>;

export type FullPaymentsProps = Readonly<{
  schedules: Map<number, AmortizationScheduleEntry[]>;
}>;

export default function FullPayments({ schedules }: FullPaymentsProps) {
  const now = useMemo(() => {
    return startOfMonth(new Date());
  }, []);
  const scheduleMap = useMemo(() => {
    return Array.from(schedules.values());
  }, [schedules]);
  const report = useMemo(() => {
    const results: SumAmortizationScheduleEntry[] = [];
    let totalInterest = 0;
    let totalPrincipal = 0;
    for (let i = 0; i < 500; i += 1) {
      let hasMoreToPay = false;
      let payment = 0;
      let interest = 0;
      let balance = 0;
      let principal = 0;
      for (let j = 0; j < scheduleMap.length; j += 1) {
        if (scheduleMap[j].length > i) {
          payment += scheduleMap[j][i].payment;
          interest += scheduleMap[j][i].interest;
          balance += scheduleMap[j][i].balance;
          principal += scheduleMap[j][i].principal;
          hasMoreToPay = true;
        } else {
          payment += scheduleMap[j][0].payment;
          principal += scheduleMap[j][0].payment;
        }
      }
      totalInterest += interest;
      totalPrincipal += principal;
      console.log(i === 0 ? interest : results[i - 1].interest);
      const result: SumAmortizationScheduleEntry = {
        month: i,
        payment,
        interest,
        balance,
        principal,
        currentInterest: totalInterest,
      };
      results.push(result);
      if (!hasMoreToPay) {
        break;
      }
    }
    return {
      schedule: results,
      interest: totalInterest,
      principal: totalPrincipal,
    };
  }, [scheduleMap]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Typography>Totals</Typography>
        <Typography>Interest: {toDollar(report.interest)}</Typography>
        <Typography>Principal: {toDollar(report.principal)}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="right">Balance End of Month</TableCell>
              <TableCell align="right">Interest Payment</TableCell>
              <TableCell align="right">Principal Payment</TableCell>
              <TableCell align="right">Payment Paid</TableCell>
              <TableCell align="right">Balance End of Month</TableCell>
              <TableCell align="right">Interest Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.schedule.map((row) => {
              return (
                <TableRow
                  key={row.month}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {format(addMonths(now, row.month), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell align="right">
                    {toDollar(row.balance + row.principal)}
                  </TableCell>
                  <TableCell align="right">{toDollar(row.interest)}</TableCell>
                  <TableCell align="right">{toDollar(row.principal)}</TableCell>
                  <TableCell align="right">{toDollar(row.payment)}</TableCell>
                  <TableCell align="right">{toDollar(row.balance)}</TableCell>
                  <TableCell align="right">
                    {toDollar(row.currentInterest)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
