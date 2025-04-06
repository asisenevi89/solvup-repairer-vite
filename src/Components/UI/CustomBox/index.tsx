import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

export interface CustomBoxProps extends BoxProps {
  wrapperClass?: string;
}

const CustomBox = ({
  wrapperClass,
  children,
  ...otherProps
}: CustomBoxProps) => (
  <div className={wrapperClass}>
    <Box {...otherProps} >
      {children}
    </Box>
  </div>
);

export default memo(CustomBox);
