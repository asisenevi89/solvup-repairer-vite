import { ReactNode, memo } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import { FormHelperTextProps }  from '@mui/material/FormHelperText';

export type CustomTextAreaProps = TextFieldProps & {
  wrapperClass?: string,
  hasError?: boolean,
  label?: ReactNode,
  helpText?: ReactNode,
  helpTextProps?: FormHelperTextProps,
  formItemProps?: FormControlProps,
}

const defaultRows = 5;

const CustomTextArea = (props: CustomTextAreaProps) => {
  const {
    wrapperClass,
    hasError = false,
    formItemProps,
    helpText,
    helpTextProps,
    ...textAreaProps
  } = props;

  return (
    <FormControl className={wrapperClass} fullWidth {...formItemProps}>
      <TextField
        error={hasError}
        multiline
        rows={defaultRows}
        helperText={helpText}
        {...textAreaProps}
      />
    </FormControl>
  );
};

export default memo(CustomTextArea);
