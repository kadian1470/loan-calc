import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useMemo, useReducer, useState } from "react";
import Dropdown from "../components/Dropdown";
import UserModal from "../components/UserModal";
import LoanSettings from "../components/loans/LoanSettings";
import LoanTabs from "../components/loans/LoanTabs";
import { useLoanOptionsContext } from "../context/LoanOptionsContext";
import useCreateUser from "../hooks/useCreateUser";
import useUsers from "../hooks/useUsers";
import MainLayout from "../layouts/MainLayout";
import { moneyFormatter } from "../utils/loanCalculations";
import { Loan, initialLoanState, loanReducer } from "../utils/loanReducer";

type ModalType = "add" | "edit" | "delete" | "user-add" | null;

export default function Loans() {
  const [state, dispatch] = useReducer(loanReducer, {
    username: "lucas",
    loans: initialLoanState("lucas"),
  });
  const { selectedLoan, setSelectedLoan } = useLoanOptionsContext();
  const { mutateAsync: createUser } = useCreateUser();
  const [modalOpen, setModalOpen] = useState<ModalType>(null);

  const { data: users } = useUsers();
  const userOptions = useMemo(() => {
    return (
      users?.results.map((user) => {
        return {
          text: user.name,
          value: user.name,
        };
      }) ?? []
    );
  }, [users]);

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
          <Button
            variant="contained"
            onClick={() => {
              setModalOpen("user-add");
            }}
          >
            Add user
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
          <Dropdown
            id="user"
            label="User"
            value={state.username}
            onChange={(newValue: string) => {
              dispatch({ type: "updateUser", value: newValue });
            }}
            options={userOptions}
          />
        </Grid2>
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
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
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
                        <Button
                          onClick={() => {
                            if (selectedLoan?.id === loan.id) {
                              setSelectedLoan(undefined);
                            }
                            dispatch({ type: "deleteLoan", value: loan });
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
        <LoanTabs loans={state.loans} />
        {modalOpen === "edit" && selectedLoan && (
          <LoanSettings
            loan={selectedLoan}
            onClose={() => {
              setModalOpen(null);
            }}
            onSubmit={(data) => {
              dispatch({ type: "updateLoan", value: data });
            }}
          />
        )}
        {modalOpen === "user-add" && (
          <UserModal
            onClose={() => {
              setModalOpen(null);
            }}
            onSubmit={async (data) => {
              await createUser(data);
            }}
          />
        )}
      </Grid2>
    </MainLayout>
  );
}
