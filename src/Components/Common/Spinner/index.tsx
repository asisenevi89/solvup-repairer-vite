import { memo, ReactNode} from 'react';
import { 
  Backdrop,
  BackdropProps,
  CircularProgress,
  CircularProgressProps,
} from '../../UI';

type SpinnerProps = {
  backdropProps: BackdropProps,
  iconProps?: CircularProgressProps,
  children: ReactNode,
  className?: string,
}

const Spinner = (props: SpinnerProps) => {
  const { backdropProps, iconProps, children, className } = props;

  return (
    <div className={`backdrop-parent ${className}`}>
      <Backdrop
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.70)',
          zIndex: 100,
          position: 'absolute',
        }}
        {...backdropProps}
      >
        <CircularProgress color="primary" { ...iconProps} />
      </Backdrop>
      {children}
    </div>
  );
};

export default memo(Spinner);
