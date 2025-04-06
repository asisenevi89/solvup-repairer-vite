import { memo } from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';

export interface CustomChipProps extends ChipProps {
  wrapperClass?: string;
  wrapper?: boolean,
}

const CustomChip = (props: CustomChipProps) => {
  const {
    wrapper = false,
    wrapperClass = '',
    ...otherProps
  } = props;

  if (!wrapper) {
    return (
      <Chip className='wrapperClass' {...otherProps} />
    );
  }

  return (
    <div className={wrapperClass}>
      <Chip {...otherProps} />
    </div>
  );
};

export default memo(CustomChip);
