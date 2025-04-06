import { memo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface CustomButtonProps extends ButtonProps {
  wrapper? : boolean,
  wrapperClass?: string,
};

const CustomButton = (props: CustomButtonProps) => {
  const {
    wrapper = true,
    wrapperClass,
    children,
    ...buttonProps 
  } = props;

  if (!wrapper) {
    return <Button className={wrapperClass} {...buttonProps}>{children}</Button>
  }

  return (
    <div className={wrapperClass}>
      <Button {...buttonProps}>{children}</Button>
    </div>
  );
};

export default memo(CustomButton);
