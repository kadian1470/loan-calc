import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export type DropdownItem<TValue extends string | number | Date> = Readonly<{
  text: string;
  value: TValue;
}>;

export type DropdownProps<TValue extends string | number | Date> = Readonly<{
  id: string;
  label: string;
  value: TValue;
  onChange: (newValue: TValue) => void;
  options: DropdownItem<TValue>[];
}>;

export default function Dropdown<TValue extends string | number | Date>({
  id,
  label,
  value,
  onChange,
  options,
}: DropdownProps<TValue>) {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={(e) => {
          const newValue = e.target.value as TValue;
          onChange(newValue);
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.text} value={option.value}>
              {option.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
