import { ChangeEvent, memo, ReactNode, useState, useEffect } from 'react';
import Checkbox, { CustomCheckboxProps } from '../CustomCheckbox';
import { FormControl, FormGroup, FormHelperText, FormLabel } from '@mui/material';

export interface CustomCheckboxGroupProps {
  heading?: ReactNode,
  orientation?: 'row' | 'column',
  helpText?: ReactNode,
  hasError?: boolean,
  onSelectionChange?: (event: ChangeEvent<HTMLInputElement>) => ( void )
  options: CustomCheckboxProps[]
  selectedOptions?: string []
}

const CustomCheckboxGroup = (props: CustomCheckboxGroupProps) => {
  const {
    heading = '',
    orientation = 'row',
    hasError = false,
    helpText = '',
    options,
    onSelectionChange,
    selectedOptions = [],
  } = props;

  const [currentOptions, setCurrentOptions] = useState<string []>([]);

  useEffect(() => {
    setCurrentOptions(selectedOptions);
  }, [JSON.stringify(selectedOptions)]);

  const onSelectOption = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentOptions((prevValues: string[]) => {
      if (prevValues.includes(value)) {
        return prevValues.filter(item => item !== value)
      }

      return [...prevValues, value]
    });

    if (onSelectionChange) {
      onSelectionChange(event);
    }
  };

  const renderOptions = () => {
    return (
      options.map(option => {
        return (
          <Checkbox
            key={option.value}
            checked={currentOptions.includes(option.value)}
            onChange={onSelectOption} 
            {...option}
          />
        )
      })
    )
  }
  
  return (
    <FormControl component="fieldset" className='custom-check-list' error={hasError}>
      <FormLabel component="legend" className='label'>{heading}</FormLabel>
      <FormGroup aria-label='position' row={orientation === 'row'} className='options'>
        {renderOptions()}
      </FormGroup>
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  )
};

export default memo(CustomCheckboxGroup);
