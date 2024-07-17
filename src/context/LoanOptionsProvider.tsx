import { ReactNode, useState } from "react";
import { Loan } from "../utils/loanReducer";
import { LoanOptionContext, PaymentType } from "./LoanOptionsContext";

export type LoanOptionsProviderProps = Readonly<{ children: ReactNode }>;

export const LoanOptionProvider = ({ children }: LoanOptionsProviderProps) => {
  const [paymentType, setPaymentType] = useState<PaymentType>("current");
  const [useTerm, setUseTerm] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | undefined>(undefined);

  return (
    <LoanOptionContext.Provider
      value={{
        paymentType,
        setPaymentType,
        useTerm,
        setUseTerm,
        selectedLoan,
        setSelectedLoan,
      }}
    >
      {children}
    </LoanOptionContext.Provider>
  );
};
