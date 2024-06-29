import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

export type DialogFooterProps = Readonly<{
  disabled: boolean;
  error?: string;
  form: string;
  onClose: () => void;
}>;

export default function DialogFooter({
  disabled,
  error,
  form,
  onClose,
}: DialogFooterProps) {
  return (
    <DialogActions>
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>
      <Button type="submit" form={form} variant="contained" disabled={disabled}>
        Save
      </Button>
    </DialogActions>
  );
}
