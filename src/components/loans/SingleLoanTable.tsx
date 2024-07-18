import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { addMonths } from "date-fns/addMonths";
import { format } from "date-fns/format";
import { useMemo } from "react";
import {
  AmortizationScheduleEntry,
  toDollar,
} from "../../utils/loanCalculations";

export type SingleLoanTableProps = Readonly<{
  schedule: AmortizationScheduleEntry[];
}>;

export default function SingleLoanTable({ schedule }: SingleLoanTableProps) {
  const now = useMemo(() => {
    return new Date();
  }, []);
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
          {schedule.map((row) => {
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
