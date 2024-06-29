import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { object, string } from "yup";
import DialogFooter from "./DialogFooter";

const formId = "userForm";

const schema = object().shape({
  id: string().required(),
  name: string().required("Name is required"),
});

export type UserForm = Readonly<{
  id: string;
  name: string;
}>;

export type UserModalProps = Readonly<{
  onClose: () => void;
  onSubmit: (data: UserForm) => void;
}>;

export default function UserModal({ onClose, onSubmit }: UserModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: uuidv4(),
      name: "",
    },
  });
  const submit = (data: UserForm) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open>
      <DialogTitle>User Settings</DialogTitle>
      <DialogContent>
        <form id={formId} onSubmit={handleSubmit(submit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                />
              );
            }}
          />
        </form>
      </DialogContent>
      <DialogFooter
        disabled={!isDirty || isSubmitting}
        form={formId}
        onClose={onClose}
      />
    </Dialog>
  );
}
