import { memo } from 'react';
import Card, { CardProps } from '@mui/material/Card';

export interface CustomCardProps extends CardProps {
  wrapperClass?: string,
};

const CustomCard = (props: CustomCardProps) => {
  const { wrapperClass, children, ...cardProps } = props;

  return (
    <div className={wrapperClass}>
      <Card className="no-shadow" {...cardProps}>{children}</Card>
    </div>
  );
};

export default memo(CustomCard);
