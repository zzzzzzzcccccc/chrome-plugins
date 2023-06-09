import { InputBaseProps } from '@mui/material';

export interface TagInputProps {
  value: string[];
  className?: string;
  onChange?: (value: string[]) => void;
  inputProps?: InputBaseProps;
}
