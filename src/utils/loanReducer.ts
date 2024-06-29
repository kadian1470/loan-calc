export type LoanActionType = "init" | "addLoan" | "updateLoan" | "deleteLoan";
export type LoanAction =
  | {
      type: "addLoan" | "updateLoan" | "deleteLoan";
      value: Loan;
    }
  | { type: "updateUser"; value: string };

export const initialLoanState = (username: string): Loan[] => {
  const storeData = localStorage.getItem(`${username}-loans`);
  if (storeData) {
    try {
      const parseData = JSON.parse(storeData) as LoansState;
      return parseData.loans;
    } catch {
      console.warn("failed to load loan info");
    }
  }
  return [];
};

export type Loan = Readonly<{
  id?: number;
  name: string;
  principal: number;
  interestRate: number;
  term?: number;
  minimumPayment: number;
  currentPayment?: number;
}>;

export type LoansState = Readonly<{
  loans: Loan[];
  username: string;
}>;
export const loanReducer = (
  state: LoansState,
  action: LoanAction
): LoansState => {
  switch (action.type) {
    case "updateUser": {
      return {
        loans: initialLoanState(action.value),
        username: action.value,
      };
    }
    case "addLoan": {
      const newState = {
        ...state,
        loans: [
          ...state.loans,
          {
            ...action.value,
            id: state.loans.length,
          },
        ],
      };
      saveData(newState);
      return newState;
    }
    case "updateLoan": {
      const loansNotFromId = state.loans.filter(
        (f) => f.id !== action.value.id
      );
      const newState = {
        ...state,
        loans: [...loansNotFromId, action.value],
      };
      saveData(newState);
      return newState;
    }
    case "deleteLoan": {
      const newState = {
        ...state,
        loans: state.loans.filter((f) => f.id !== action.value.id),
      };
      saveData(newState);
      return newState;
    }
    default:
      return state;
  }
};

const saveData = (state: LoansState) => {
  localStorage.setItem(`${state.username}-loans`, JSON.stringify(state));
};
