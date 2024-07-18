import { FormControlLabel, Switch } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  PaymentType,
  useLoanOptionsContext,
} from "../../context/LoanOptionsContext";
import { Loan } from "../../utils/loanReducer";
import { loanDashboard, loanSchedule } from "../../utils/routes";
import Dropdown, { DropdownItem } from "../Dropdown";
import NavigationTabs, { NavigationTab } from "../NavigationTabs";
import LoanChart from "./LoanChart";
import LoanSchedule from "./LoanSchedule";

const tabs: NavigationTab[] = [
  { label: "Dashboard", route: loanDashboard },
  { label: "Schdule", route: loanSchedule },
];

const paymentOptions: DropdownItem<string>[] = [
  { text: "Minimum Payment", value: "min" },
  { text: "Current Payment", value: "current" },
];

export type LoanTabsProps = Readonly<{
  loans: Loan[];
}>;

export default function LoanTabs({ loans }: LoanTabsProps) {
  const { paymentType, setPaymentType, useTerm, setUseTerm } =
    useLoanOptionsContext();

  return (
    <Grid2 container sx={{ width: "100%" }} gap={2} alignContent="center">
      <Grid2 xs={2}>
        <Dropdown
          id="payment-type"
          label="Payment type"
          value={paymentType}
          onChange={(newValue) => {
            setPaymentType(newValue as PaymentType);
          }}
          options={paymentOptions}
        />
      </Grid2>
      <Grid2 xs={2} alignSelf="center">
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
      <Grid2 xs={12}>
        <NavigationTabs tabs={tabs} />
        <Routes>
          <Route path="/" element={<div>loans</div>} />
          <Route path="schedule" element={<LoanSchedule loans={loans} />} />
          <Route path="dashboard" element={<LoanChart loans={loans} />} />
        </Routes>
      </Grid2>
      <Grid2 xs={12} height="auto">
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
