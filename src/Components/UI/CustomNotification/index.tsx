import { memo, ReactNode, SyntheticEvent, useState, useEffect } from 'react';
import Snackbar, { SnackbarCloseReason, SnackbarProps } from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

type AlertSeverity = 'error' | 'info' | 'success' | 'warning';
type Placement = {
  vertical: 'top' | 'bottom',
  horizontal: 'left' | 'center' | 'right';
};

const autoHideBy = 5000;
const placement: Placement = { vertical: 'bottom', horizontal: 'right' };

export interface CustomNotificationProps extends SnackbarProps {
  wrapperClass?: string,
  message: ReactNode,
  type: AlertSeverity,
  onClose?: () => void,
  alertParams?: AlertProps
};

const CustomNotification = (props: CustomNotificationProps) => {
  const {
    wrapperClass = '',
    message,
    type,
    open,
    onClose,
    alertParams,
    ...snackBarParams
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!open);
  }, [open])

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    if (onClose) {
      onClose();
    }

    setIsOpen(false);
  };

  return (
    <div className={`custom-notification ${wrapperClass}`}>
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideBy}
        onClose={handleClose}
        anchorOrigin={placement}
        {...snackBarParams}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="outlined"
          sx={{ width: '100%' }}
          {...alertParams}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default memo(CustomNotification);
