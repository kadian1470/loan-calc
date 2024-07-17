export type CalculateLoanPaymentProp = Readonly<{
  principal: number;
  annualInterestRate: number;
  loanTermYears: number;
}>;
export const calculateLoanPayment = ({
  principal,
  annualInterestRate,
  loanTermYears,
}: CalculateLoanPaymentProp) => {
  // Convert annual interest rate to monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  // Convert loan term from years to months
  const numberOfPayments = loanTermYears * 12;

  // Calculate monthly payment using the formula
  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return { monthlyPayment, numberOfPayments, monthlyInterestRate };
};

type AmortizationScheduleEntry = Readonly<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}>;
const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};
export const calculateAmortizationSchedule = ({
  principal,
  annualInterestRate,
  loanTermYears,
}: ScheduleOption): AmortizationScheduleEntry[] => {
  const { monthlyPayment, numberOfPayments, monthlyInterestRate } =
    calculateLoanPayment({ principal, annualInterestRate, loanTermYears });
  let balance = principal;
  const schedule: AmortizationScheduleEntry[] = [];
  for (let month = 1; month <= numberOfPayments; month++) {
    const interest = roundToTwoDecimals(balance * monthlyInterestRate);
    const principalPayment = roundToTwoDecimals(monthlyPayment - interest);
    balance = roundToTwoDecimals(balance - principalPayment);

    schedule.push({
      month: month,
      payment: roundToTwoDecimals(monthlyPayment),
      principal: principalPayment,
      interest: interest,
      balance: balance,
    });
  }

  return schedule;
};

type ScheduleOption = Readonly<{
  principal: number;
  annualInterestRate: number;
  loanTermYears: number;
}>;
type OverrideScheduleOption = ScheduleOption &
  Readonly<{
    monthlyPayment: number;
  }>;

export const calculateAmortizationScheduleWithOverridePayment = ({
  principal,
  annualInterestRate,
  loanTermYears,
  monthlyPayment,
}: OverrideScheduleOption) => {
  const { numberOfPayments, monthlyInterestRate } = calculateLoanPayment({
    principal,
    annualInterestRate,
    loanTermYears,
  });
  let balance = principal;
  let month = 1;
  const schedule: AmortizationScheduleEntry[] = [];
  while (balance > 0 && month <= numberOfPayments) {
    const interest = roundToTwoDecimals(balance * monthlyInterestRate);
    // To avoid round into neg this was overriden
    if (balance < monthlyPayment) {
      const internalPayment = roundToTwoDecimals(balance + interest);
      schedule.push({
        month: month,
        payment: internalPayment,
        principal: roundToTwoDecimals(balance),
        interest: interest,
        balance: 0,
      });
      break;
    }

    const principalPayment = roundToTwoDecimals(monthlyPayment - interest);
    balance = roundToTwoDecimals(balance - principalPayment);

    schedule.push({
      month: month,
      payment: roundToTwoDecimals(monthlyPayment),
      principal: principalPayment,
      interest: interest,
      balance: balance < 0 ? 0 : balance,
    });
    month += 1;
  }

  return schedule;
};

export const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const toDollar = (value: number) => moneyFormatter.format(value);