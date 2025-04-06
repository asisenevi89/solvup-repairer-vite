import { memo} from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

export interface CustomIconButtonProps extends IconButtonProps {
  wrapper? : boolean,
  wrapperClass?: string,
};

const CustomIconButton = (props: CustomIconButtonProps) => {
  const {
    wrapper = false,
    wrapperClass,
    children,
    ...buttonProps 
  } = props;

  if (!wrapper) {
    return <IconButton {...buttonProps}>{children}</IconButton>
  }

  return (
    <div className={wrapperClass}>
      <IconButton {...buttonProps}>{children}</IconButton>
    </div>
  );
};

export default memo(CustomIconButton);
