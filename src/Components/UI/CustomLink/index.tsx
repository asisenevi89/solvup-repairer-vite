import { memo } from 'react';
import Link, { LinkProps } from '@mui/material/Link';

export interface CustomLinkProps extends LinkProps {
  wrapperClass?: string,
  wrapper?: boolean,
};

const CustomLink = (props: CustomLinkProps) => {
  const {
    wrapper = false,
    wrapperClass,
    children,
    ...linkProps
  } = props;

  if (!wrapper) {
    return (
      <Link
        className={wrapperClass}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className={wrapperClass}>
      <Link {...linkProps}>{children}</Link>
    </div>
  );
};

export default memo(CustomLink);
