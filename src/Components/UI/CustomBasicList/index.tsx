import { ReactElement, ReactNode, memo } from 'react';
import List, { ListProps } from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ListValueType } from '../../../CustomTypes';
import { Tooltip } from '..';

export interface CustomListItemProps extends ListItemProps {
  value: ListValueType,
  primaryText: ReactNode,
  icon?: ReactElement
  secondaryText?: string,
  hideCheckBox?: boolean,
  disabled?: boolean,
  tooltipText?: ReactNode,
}

export type BasicListProps = ListProps & {
  listItems: CustomListItemProps[],
  wrapperClass?: string,
  selectedValues?: ListValueType[],
  onSelectItem?: (value: ListValueType) => void,
  showItemCheckBox?: boolean
}

const CustomBasicList = (props: BasicListProps) => {
  const {
    wrapperClass,
    listItems,
    onSelectItem = () => {},
    selectedValues = [],
    showItemCheckBox = false,
    ...listProps
  } = props;

  const getItem = (item: CustomListItemProps) => {
    const {
      icon,
      value,
      primaryText,
      secondaryText,
      hideCheckBox = false,
      disabled = false,
      tooltipText = '',
      ...restProps
    } = item;

    return (
      <ListItem disablePadding key={value} {...restProps}>
        <ListItemButton
          disabled={disabled}
          onClick={() => onSelectItem(value)}
          selected={selectedValues.includes(value)}
        >
          {showItemCheckBox && !hideCheckBox &&(
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedValues.includes(value)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
          )}
          {icon && (
            <ListItemIcon>
              {icon}
            </ListItemIcon>
          )}
          <ListItemText primary={primaryText} secondary={secondaryText || ''} />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderListItems = () => (
    listItems.map(item => {
      if (item.tooltipText) {
        return (
          <Tooltip key={item.value} title={item.tooltipText}  arrow>
            {getItem(item)}
          </Tooltip>
        );
      }

      return getItem(item);
    })
  );

  return (
    <div className={wrapperClass}>
      <List {...listProps}>
        {renderListItems()}
      </List>
    </div>
  );
};

export default memo(CustomBasicList);
