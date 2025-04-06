import { forwardRef, memo } from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export interface CustomTooltipProps extends TooltipProps {
  wrapperClass?: string,
  wrapper?: boolean,
};

const CustomTooltip = forwardRef((props: CustomTooltipProps, ref) => {
  const {
    wrapperClass,
    wrapper = false,
    children,
    ...tooltipProps
  } = props;

  if (!wrapper) {
    return (
      <Tooltip
        className={wrapperClass}
        ref={ref}
        {...tooltipProps}
      >
        {children}
       </Tooltip>
    );
  }

  return (
    <div className={wrapperClass}>
      <Tooltip {...tooltipProps}>{children}</Tooltip>
    </div>
  );
});

export default memo(CustomTooltip);
