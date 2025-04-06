import { memo } from 'react';
import Popover, { PopoverProps } from '@mui/material/Popover';

export interface CustomPopoverProps extends PopoverProps {
  wrapperClass?: string,
  wrapper?: boolean
};

const CustomPopover = (props: CustomPopoverProps) => {
  const {
    wrapper = false,
    wrapperClass,
    children,
    ...popoverProps
  } = props;

  if (!wrapper) {
    return (
      <Popover className={wrapperClass}{...popoverProps}>
        {children}
      </Popover>
    );
  }

  return (
    <div className={wrapperClass}>
      <Popover {...popoverProps}>{children}</Popover>
    </div>
  );
};

export default memo(CustomPopover);
