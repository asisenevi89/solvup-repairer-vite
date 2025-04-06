import { memo } from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

export interface CustomCheckboxProps extends CheckboxProps {
  label?: string,
  value: string,
  labelPlacement?: 'top' | 'bottom' | 'start' | 'end',
}

const CustomCheckbox = (props: CustomCheckboxProps) => {
  const {
    label = '', 
    labelPlacement = 'end',
    ...restProps
  } = props;

  if (label) {
    return (
      <FormControlLabel
        value={labelPlacement}
        label={label}
        control={<Checkbox {...restProps} />}
        labelPlacement={labelPlacement}
      />
    )
  }
  return <Checkbox {...restProps} />
};

export default memo(CustomCheckbox);
