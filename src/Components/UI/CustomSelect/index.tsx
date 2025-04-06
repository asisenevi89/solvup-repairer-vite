import { ReactNode, memo, MouseEvent} from 'react';
import Select, { SelectProps} from '@mui/material/Select';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, SelectChangeEvent, Chip } from "@mui/material";
import CancelIcon from '@mui/icons-material/Close';

export type SelectOptionType = {
  value: string | number,
  label: ReactNode,
};

export type ChangeEvent = SelectChangeEvent<unknown>;

export type CustomSelectProps = SelectProps & {
  label?: ReactNode,
  options: SelectOptionType[],
  hasError?: boolean,
  formItemProps?: FormControlProps,
  labelProps?: InputLabelProps,
  helpText?: ReactNode,
  helpTextProps?: FormHelperTextProps,
  wrapperClass?: string,
  onDeleteItem?: (id: string | number) => void
  showTags?: boolean,
  showCheck?: boolean,
  placeholder?: string,
}; 

const CustomSelect = (props: CustomSelectProps ) => {
  const {
    label,
    options,
    hasError = false,
    formItemProps,
    labelProps,
    helpText,
    helpTextProps,
    wrapperClass,
    showTags = false,
    showCheck = false,
    onDeleteItem,
    ...selectProps
  } = props;
  const labelId = `label-for-${label}`;

  const renderValue = (selected: any) => {
    const deleteTag = (event: MouseEvent<HTMLElement>, id: number | string ) => {
      event.stopPropagation();

      if (onDeleteItem) {
        onDeleteItem(id);
      }
    };
    
    if (!selectProps.multiple) {
      const find = options.find(item => item.value === selected);
      return find?.label || null;
    }

    const values = options.filter(item => selected.includes(item.value)).map(item => { 
      if (showTags) {
        return (
          <Chip
            className='select-chip'
            label={item.label}
            onDelete={(event) => deleteTag(event, item.value)}
            deleteIcon={<CancelIcon />}
          />
        );
      }

      return item.label
    });

    if (showTags) {
      return <div className='select-tag-container'>{values}</div>
    }

    return values.join(', ');
  }

  const currentValues = selectProps.multiple ? selectProps.value as number[] : []

  return (
    <FormControl className={wrapperClass} fullWidth error={hasError} {...formItemProps}>
      <InputLabel {...labelProps} id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId} 
        renderValue={renderValue}
        {...selectProps}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
           >
            {selectProps.multiple && showCheck && (
              <Checkbox checked={currentValues.includes(option.value as number)} />
            )}
            {option.label}
           </MenuItem>
        ))}
      </Select>
      {helpText && (
        <FormHelperText {...helpTextProps}>{helpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(CustomSelect);
