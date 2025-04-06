import { memo} from 'react';
import CircularProgress, { CircularProgressProps} from '@mui/material/CircularProgress';

export interface CustomCircularProgressProps extends CircularProgressProps {
  wrapperClass?: string,
};

const CustomCircularProgress = (props: CustomCircularProgressProps) => {
  const { wrapperClass, ...circularProgressProps } = props;

  return (
    <div className={wrapperClass}>
      <CircularProgress {...circularProgressProps} />
    </div>
  );
};

export default memo(CustomCircularProgress);

