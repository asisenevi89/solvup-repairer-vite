import { ReactNode, memo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '../CustomFormControlLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';

type RadioItem = {
  value: string,
  label: ReactNode,
  disabled?: boolean,
}

type RadioGroupType = 'vertical' | 'row';

export interface CustomRadioGroupProps extends RadioGroupProps {
  wrapperClass?: string,
  formItemProps?: FormControlProps,
  formLabelProps?: FormLabelProps,
  hasError?: boolean,
  helpText?: ReactNode,
  helpTextProps?: FormHelperTextProps,
  label?: ReactNode,
  items: RadioItem [],
  orientation?: RadioGroupType
}

const CustomRadioGroup = (props: CustomRadioGroupProps) => {
  const {
    wrapperClass,
    formItemProps,
    formLabelProps,
    hasError,
    helpText,
    helpTextProps,
    label,
    items,
    orientation = 'vertical',
    ...radioGroupProps
  } = props;

  const labelId = `label-for-${label}`;

  return (
    <FormControl
      className={`radio-group-parent ${wrapperClass}`}
      {...formItemProps} error={hasError}
    >
      <FormLabel id={labelId} className='top-label' {...formLabelProps}>
        {label}
      </FormLabel>
      <RadioGroup className={orientation} aria-labelledby={labelId} {...radioGroupProps}>
        {items.map(item => {
          return <FormControlLabel key={item.value} control={<Radio />} {...item} />
        })}
      </RadioGroup>
      {helpText && (
        <FormHelperText {...helpTextProps}>{helpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(CustomRadioGroup);
