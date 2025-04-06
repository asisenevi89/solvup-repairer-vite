import { useState, useEffect, memo, ReactNode }  from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface CustomDialogProps extends DialogProps {
  heading: ReactNode,
  message: ReactNode,
  cancelVariant?: ButtonProps['variant'],
  acceptVariant?: ButtonProps['variant'],
  cancelColor?: ButtonProps['color'],
  acceptColor?: ButtonProps['color'],
  cancelText?: ReactNode,
  acceptText?: ReactNode,
  onCancel?: () => void;
  onAccept?: () => void;
};

const CustomDialog = ({
  open,
  heading,
  message,
  cancelText = 'Cancel',
  acceptText = 'Confirm',
  acceptVariant = 'contained',
  cancelVariant = 'contained',
  acceptColor = 'error',
  cancelColor = 'inherit',
  onCancel = () => {},
  onAccept = () => {},
}: CustomDialogProps) => {

  const [currentOpen, setCurrentOpen] = useState(false);

  useEffect(() => {
    setCurrentOpen(open);
  }, [open])


  const handleClose = () => {
    setCurrentOpen(false);
    onCancel();
  };

  return (
    <Dialog
      open={currentOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {heading}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color={cancelColor}
          variant={cancelVariant}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          color={acceptColor}
          variant={acceptVariant}
          onClick={onAccept}
        >
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(CustomDialog);
