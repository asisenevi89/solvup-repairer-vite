import { memo } from 'react';
import FormControl, { FormControlProps } from '@mui/material/FormControl';

export interface CustomFormControlProps extends FormControlProps {}

const CustomFormControl = ({
  children,
  ...otherProps
}: CustomFormControlProps) => (
  <FormControl {...otherProps} >
    {children}
  </FormControl>
);

export default memo(CustomFormControl);
