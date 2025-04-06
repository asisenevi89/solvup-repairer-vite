import { memo } from 'react';
import Autocomplete, { AutocompleteProps, } from '@mui/material/Autocomplete';

export interface CustomAutocompleteProps extends AutocompleteProps<any, any, any, any> {
  wrapper?: boolean,
  wrapperClass?: string,
}

const CustomAutocomplete = (props: CustomAutocompleteProps) => {
  const { 
    wrapper = false,
    wrapperClass = '',
    ...restProps
  } = props;
  
  if (wrapper) {
    return (
      <div className={`custom-autocomplete ${wrapperClass}`}>
        <Autocomplete {...restProps} />
      </div>
    )
  }

  return <Autocomplete {...restProps} />
};

export default memo(CustomAutocomplete);
