import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Controller, useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { Loan } from "../utils/loanReducer";
import DialogFooter from "./DialogFooter";

const loanFormId = "loan-form";

type LoanSettingsProps = Readonly<{
  loan?: Loan;
  onSubmit: (form: Loan) => void;
  onClose: () => void;
}>;

const schema = object().shape({
  name: string().required("Name is required"),
  principal: number()
    .required("Starting amount is required")
    .min(0, "Starting amount must be greater than 0"),
  interestRate: number()
    .required("Interest Rate is required")
    .min(0, "Interest Rate must be greater than 0"),
  term: number(),
  minimumPayment: number()
    .required("Minimum Payment is required")
    .min(0, "Minimum Payment must be greater than 0"),
  currentPayment: number().nullable(),
});

export default function LoanSettings({
  loan,
  onSubmit,
  onClose,
}: LoanSettingsProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<Loan>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      id: loan?.id,
      name: loan?.name ?? "",
      principal: loan?.principal ?? 0,
      interestRate: loan?.interestRate ?? 0,
      term: loan?.term ?? 60,
      minimumPayment: loan?.minimumPayment ?? 0,
      currentPayment: loan?.currentPayment,
    },
  });

  const submit = (data: Loan) => {
    onSubmit(data);
    onClose();
  };
  return (
    <>
      <Dialog open onClose={onClose}>
        <DialogTitle>Loan Settings</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submit)} id={loanFormId}>
            <Grid2 container xs={12} spacing={2} py={1}>
              <Grid2 xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        fullWidth
                        label="Name"
                        helperText={errors.name?.message}
                        error={!!errors.name?.message}
                      />
                    );
                  }}
                />
              </Grid2>
              <Grid2 xs={6}>
                <Controller
                  name="principal"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        label="Principal"
                        helperText={errors.name?.message}
                        error={!!errors.name?.message}
                      />
                    );
                  }}
                />
              </Grid2>
              <Grid2 xs={6}>
                <Controller
                  name="minimumPayment"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        label="Minimum Payment"
                        helperText={errors.name?.message}
                        error={!!errors.name?.message}
                      />
                    );
                  }}
                />
              </Grid2>
              <Grid2 xs={4}>
                <Controller
                  name="interestRate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        }}
                        label="Interest Rate"
                        helperText={errors.name?.message}
                        error={!!errors.name?.message}
                      />
                    );
                  }}
                />
              </Grid2>
              <Grid2 xs={4}>
                <Controller
                  name="term"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="Term"
                        helperText={errors.name?.message}
                        error={!!errors.name?.message}
                      />
                    );
                  }}
                />
              </Grid2>
              <Grid2 xs={4}>
                <Controller
                  name="currentPayment"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        label="Current Payment"
                        helperText={errors.name?.message}
                        error={!!errors.name?.message}
                      />
                    );
                  }}
                />
              </Grid2>
            </Grid2>
          </form>
        </DialogContent>
        <DialogFooter
          form={loanFormId}
          onClose={onClose}
          disabled={isDirty || isSubmitting}
        />
      </Dialog>
    </>
  );
}
