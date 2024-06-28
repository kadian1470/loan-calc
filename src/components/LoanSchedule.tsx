import { FormControlLabel, Switch } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid2 from "@mui/material/Unstable_Grid2";
import { addMonths, format } from "date-fns";
import { useMemo, useState } from "react";
import {
  calculateAmortizationSchedule,
  calculateAmortizationScheduleWithOverridePayment,
  moneyFormatter,
} from "../utils/loanCalculations";
import { Loan } from "../utils/loanReducer";
import Dropdown, { DropdownItem } from "./Dropdown";

const toDollar = (value: number) => moneyFormatter.format(value);

const paymentOptions: DropdownItem<string>[] = [
  { text: "Minimum Payment", value: "min" },
  { text: "Current Payment", value: "current" },
];

type PaymentType = "min" | "current";

type LoanScheduleProps = Readonly<{
  loan: Loan;
}>;
const now = new Date();
export default function LoanSchedule({ loan }: LoanScheduleProps) {
  const [paymentType, setPaymentType] = useState<PaymentType>("current");
  const [useTerm, setUseTerm] = useState(false);
  const schdule = useMemo(() => {
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
    console.log(payment);

    return calculateAmortizationScheduleWithOverridePayment({
      principal: loan.principal,
      annualInterestRate: loan.interestRate,
      loanTermYears: loan.term ?? 60,
      monthlyPayment: payment,
    });
  }, [loan, paymentType, useTerm]);

  return (
    <Grid2 container>
      <Grid2>
        <Dropdown
          id="payment-type"
          label="Payment type"
          value={paymentType}
          onChange={(newValue) => {
            setPaymentType(newValue as PaymentType);
          }}
          options={paymentOptions}
        />
        <FormControlLabel
          label="Use Term"
          control={
            <Switch
              defaultChecked={useTerm}
              onChange={(e) => {
                const checked = e.target.checked;
                setUseTerm(checked);
              }}
            />
          }
        />
      </Grid2>
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
    </Grid2>
  );
}
