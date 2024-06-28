import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useReducer, useState } from "react";
import LoanSchedule from "../components/LoanSchedule";
import LoanSettings from "../components/LoanSettings";
import MainLayout from "../layouts/MainLayout";
import { moneyFormatter } from "../utils/loanCalculations";
import { Loan, LoansState, loanReducer } from "../utils/loanReducer";

type ModalType = "add" | "edit" | "delete" | null;

const initialState = (username: string): Loan[] => {
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

export default function Loans() {
  console.log("render");
  const [state, dispatch] = useReducer(loanReducer, {
    username: "lucas",
    loans: initialState("lucas"),
  });
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  return (
    <MainLayout
      title="Loans"
      rightPanel={
        <>
          <Button
            variant="contained"
            onClick={() => {
              setModalOpen("add");
            }}
          >
            Add Loan
          </Button>
          {modalOpen === "add" && (
            <LoanSettings
              onClose={() => {
                setModalOpen(null);
              }}
              onSubmit={(data) => {
                dispatch({ type: "addLoan", value: data });
              }}
            />
          )}
        </>
      }
    >
      <Grid2 container gap={2}>
        <Grid2 xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Loan Name</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Interest Rate</TableCell>
                  <TableCell align="right">Terms&nbsp;(month)</TableCell>
                  <TableCell align="right">Current Payment</TableCell>
                  <TableCell align="right">Minimum Payment</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.loans.map((loan: Loan) => {
                  return (
                    <TableRow
                      key={loan.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => {
                        setSelectedLoan(loan);
                      }}
                      selected={selectedLoan?.id === loan.id}
                    >
                      <TableCell>{loan.name}</TableCell>
                      <TableCell align="right">
                        {moneyFormatter.format(loan.principal)}
                      </TableCell>
                      <TableCell align="right">{loan.interestRate}%</TableCell>
                      <TableCell align="right">{loan.term}</TableCell>
                      <TableCell align="right">
                        {moneyFormatter.format(loan.currentPayment ?? 0)}
                      </TableCell>
                      <TableCell align="right">
                        {moneyFormatter.format(loan.minimumPayment)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            setSelectedLoan(loan);
                            setModalOpen("edit");
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
        {selectedLoan && <LoanSchedule loan={selectedLoan} />}

        {modalOpen === "edit" && selectedLoan && (
          <LoanSettings
            loan={selectedLoan}
            onClose={() => {
              setModalOpen(null);
            }}
            onSubmit={(data) => {
              dispatch({ type: "addLoan", value: data });
            }}
          />
        )}
      </Grid2>
    </MainLayout>
  );
}
