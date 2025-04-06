import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import FormControl, { FormControlProps } from '@mui/material/FormControl';

export interface CustomDatePickerProps extends DatePickerProps<any>{
  wrapperClass?: string,
  formItemProps?: FormControlProps,
}

const CustomDatePicker = ({
  wrapperClass = '',
  formItemProps,
  ...datePickerProps
}: CustomDatePickerProps) => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <FormControl
      fullWidth
      className={`custom-date-picker ${wrapperClass}`}
      {...formItemProps}
    >
      <DatePicker {...datePickerProps} />
    </FormControl>
  </LocalizationProvider>
);

export default CustomDatePicker;
