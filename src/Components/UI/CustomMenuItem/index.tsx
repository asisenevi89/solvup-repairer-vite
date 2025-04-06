import { memo } from 'react';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

export interface CustomMenuItemProps extends MenuItemProps {
  wrapper?: boolean,
  wrapperClass?: string,
}

const CustomMenuItem = ({
  wrapper = false,
  wrapperClass = '',
  ...itemProps
}: CustomMenuItemProps) => {
  
  if (wrapper) {
    return (
      <div className={wrapperClass}>
        <MenuItem {...itemProps}/>
      </div>
    );
  }

  return <MenuItem {...itemProps} />
};

export default memo(CustomMenuItem);
