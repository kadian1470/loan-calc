export type LoanActionType = "init" | "addLoan" | "updateLoan" | "deleteLoan";
export type LoanAction = {
  type: "addLoan" | "updateLoan" | "deleteLoan";
  value: Loan;
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
