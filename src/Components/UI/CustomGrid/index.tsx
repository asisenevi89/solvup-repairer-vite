import { memo } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';

export interface CustomGridProps extends GridProps {
  wrapperClass?: string;
  wrapper?: boolean,
}

const CustomGrid = ({
  wrapperClass,
  wrapper = true,
  children,
  ...otherProps
}: CustomGridProps) => {

  if (!wrapper) {
    return (
      <Grid {...otherProps}>
        {children}
      </Grid>
    );
  }

  return (
    <div className={wrapperClass}>
      <Grid {...otherProps}>
        {children}
      </Grid>
    </div>
  )
};

export default memo(CustomGrid);
