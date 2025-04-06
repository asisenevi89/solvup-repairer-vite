import { memo} from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';

export interface CustomAlertProps extends AlertProps {
  wrapper?: boolean,
  wrapperClass?: string,
};

const CustomAlert = (props: CustomAlertProps) => {
  const {
    wrapper = false,
    wrapperClass = '',
    children,
    ...alertProps
  } = props;

  if (!wrapper) {
    return <Alert className={wrapperClass} {...alertProps}>{children}</Alert>
  }

  return (
    <div className={wrapperClass}>
      <Alert {...alertProps}>{children}</Alert>
    </div>
  );
};

export default memo(CustomAlert);
