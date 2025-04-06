import { memo} from 'react';
import Backdrop, { BackdropProps } from '@mui/material/Backdrop';

export interface CustomBackdropProps extends BackdropProps {
  wrapperClass?: string,
};

const CustomBackdrop = (props: CustomBackdropProps) => {
  const { wrapperClass, children, ...backdropProps } = props;
  
  return (
    <div className={wrapperClass}>
      <Backdrop {...backdropProps}>
        {children}
      </Backdrop>
    </div>
  );
};

export default memo(CustomBackdrop);
