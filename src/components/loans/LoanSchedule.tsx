import { useMemo, useState } from "react";
import { useLoanOptionsContext } from "../../context/LoanOptionsContext";
import {
  AmortizationScheduleEntry,
  calculateAmortizationSchedule,
  calculateAmortizationScheduleWithOverridePayment,
} from "../../utils/loanCalculations";
import { Loan } from "../../utils/loanReducer";
import FullPayments from "./FullPayments";
import SingleLoanTable from "./SingleLoanTable";

export type LoanScheduleProps = Readonly<{
  loans: Loan[];
}>;

export default function LoanSchedule({ loans }: LoanScheduleProps) {
  const [fullSchedule, setFullSchedule] = useState(true);

  const { useTerm, paymentType, selectedLoan } = useLoanOptionsContext();

  const schedules = useMemo(() => {
    const result = new Map<number, AmortizationScheduleEntry[]>();
    loans.forEach((loan) => {
      if (loan.id !== undefined) {
        if (useTerm && loan.term) {
          const schedule = calculateAmortizationSchedule({
            principal: loan.principal,
            annualInterestRate: loan.interestRate,
            loanTermYears: loan.term / 12,
          });
          result.set(loan.id, schedule);
        } else {
          let payment = loan.minimumPayment;
          if (paymentType === "current" && loan.currentPayment) {
            payment = loan.currentPayment;
          }

          const schdule = calculateAmortizationScheduleWithOverridePayment({
            principal: loan.principal,
            annualInterestRate: loan.interestRate,
            loanTermYears: loan.term ?? 60,
            monthlyPayment: payment,
          });
          result.set(loan.id, schdule);
        }
      }
    });
    return result;
  }, [loans, paymentType, useTerm]);

  if (fullSchedule) {
    return <FullPayments schedules={schedules} />;
  } else {
    return (
      <SingleLoanTable schedule={schedules.get(selectedLoan?.id ?? 0) ?? []} />
    );
  }
}
