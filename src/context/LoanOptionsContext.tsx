import { createContext, useContext } from "react";
import { Loan } from "../utils/loanReducer";
export type PaymentType = "min" | "current";

export const LoanOptionContext = createContext<
  LoanOptionsContextProps | undefined
>(undefined);

export type LoanOptionsContextProps = Readonly<{
  paymentType: PaymentType;
  setPaymentType: React.Dispatch<React.SetStateAction<PaymentType>>;
  useTerm: boolean;
  setUseTerm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLoan: Loan | undefined;
  setSelectedLoan: React.Dispatch<React.SetStateAction<Loan | undefined>>;
}>;

// eslint-disable-next-line react-refresh/only-export-components
export const useLoanOptionsContext = () => {
  const context = useContext<LoanOptionsContextProps | undefined>(
    LoanOptionContext
  );
  if (context === undefined) {
    throw new Error(
      "useLoanOptionsContext must be used within a PaymentProvider"
    );
  }
  return context;
};
