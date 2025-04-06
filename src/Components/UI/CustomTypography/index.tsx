import { memo } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

export interface CustomTypographyProps extends TypographyProps {
  wrapperClass?: string,
  wrapper?: boolean,
};

const CustomTypography = (props: CustomTypographyProps) => {
  const {
    wrapperClass,
    wrapper = false,
    children,
    ...typographyProps
  } = props;

  if (!wrapper) {
    return (
      <Typography
        className={wrapperClass}
        {...typographyProps}
      >
        {children}
       </Typography>
    );
  }

  return (
    <div className={wrapperClass}>
      <Typography {...typographyProps}>{children}</Typography>
    </div>
  );
};

export default memo(CustomTypography);
