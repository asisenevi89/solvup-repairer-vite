import { ReactNode, useEffect, useState, memo, ChangeEvent } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

export interface CustomSwitchProps extends SwitchProps {
  label?: ReactNode,
  labelProps?: FormControlLabelProps,
}

const CustomSwitch = (props: CustomSwitchProps) => {
  const { label, labelProps, onChange, checked, ...restProps } = props;
  const [checkedStatus, setCheckedStatus] = useState(false);

  useEffect(() => {
    setCheckedStatus(!!checked);
  }, [checked])

  const onCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setCheckedStatus(checked);

    if (onChange) {
      onChange(event, checked)
    }
  }

  const switchElement = (
    <Switch 
      checked={checkedStatus}
      onChange={onCheckChange}
      {...restProps}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={switchElement}
        label={label}
        {...labelProps}
      />
    );
  }

  return switchElement;
};

export default memo(CustomSwitch);
