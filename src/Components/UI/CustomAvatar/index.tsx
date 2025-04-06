import { memo} from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';

export interface CustomAvatarProps extends AvatarProps {
  wrapperClass?: string,
  wrapper?: boolean
};

const CustomAvatar = (props: CustomAvatarProps) => {
  const {
    wrapper = false,
    wrapperClass,
    children,
    ...avatarProps
  } = props;

  if (!wrapper) {
    return (
      <Avatar className={wrapperClass}{...avatarProps}>
        {children}
      </Avatar>
    );
  }

  return (
    <div className={wrapperClass}>
      <Avatar {...avatarProps}>{children}</Avatar>
    </div>
  );
};

export default memo(CustomAvatar);
