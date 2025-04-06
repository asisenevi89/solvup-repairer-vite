import { ReactNode, memo } from 'react';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

export interface CustomFormControlLabelProps extends FormControlLabelProps {
  value: string | number,
  label: ReactNode,
}

const CustomRadio = (props: CustomFormControlLabelProps) => {
  const {
    value,
    label,
    ...radioLabelProps
  } = props;

  return (
    <FormControlLabel 
      value={value}
      label={label}
      {...radioLabelProps}
    />
  );
};

export default memo(CustomRadio);
