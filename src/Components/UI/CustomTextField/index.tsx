import { memo } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl, { FormControlProps } from '@mui/material/FormControl';

export type CustomTextFieldProps = TextFieldProps & {
  wrapperClass?: string,
  hasError?: boolean,
  formItemProps?: FormControlProps,
};


const CustomTextField = (props: CustomTextFieldProps) => {
  const {
    wrapperClass,
    hasError,
    formItemProps,
    ...textFieldProps
  } = props
  return (
    <FormControl className={wrapperClass} {...formItemProps} error={hasError}>
      <TextField error={hasError} {...textFieldProps} />
    </FormControl>
  );
};

export default memo(CustomTextField);
