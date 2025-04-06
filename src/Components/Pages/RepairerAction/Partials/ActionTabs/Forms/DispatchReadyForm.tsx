import { ChangeEvent, memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Select,
  TextArea,
  TextField,
  Button,
  RadioGroup,
  SelectChangeEvent,
} from "../../../../../UI";
import { COURIERS } from "../../../../../../Utils/Constants";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import DetailCard from "../../../../../Common/DetailCard";
import { CommonObjType, DispatchReadyType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string
  currentValues: DispatchReadyType | undefined
  customerDetails?: CommonObjType,
  onlyToCustomer?: boolean
};

const toCustomer = 'toCustomer';
const toStore = 'toStore';
const options = [
  { value: toCustomer, label: 'Deliver to the customer.' },
];

const defaultErrors: CommonObjType = {
  courier: '',
  noteNumber: '',
  comments: ''
};

const DispatchReadyForm = (props: FormType) => {
  const dispatch = useDispatch();
  const { currentValues, customerDetails, onlyToCustomer = false } = props;
  const dispatchOptions = [
    ...options,
    { value: toStore, label: 'Deliver to the store.', disabled: onlyToCustomer },
  ];

  const [courier, setCourier] = useState('');
  const [dispatchTo, setDispatchTo] = useState(toCustomer);
  const [noteNumber, setNoteNumber] = useState('');
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    setCourier(currentValues.courier);
    setNoteNumber(currentValues.noteNumber.toString());
    setComments(currentValues.comments || '');
    setDispatchTo(currentValues.dispatchTo);
  }, [currentValues]);



  const onChangeCourier = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setCourier(value as string);
    setErrors({
      ...errors,
      courier: '',
    });
  };

  const onChangeNoteNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNoteNumber(value);
    setErrors({
      ...errors,
      noteNumber: '',
    });
  };

  const onChangeComments = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setComments(value);
  };

  const onChangeDispatch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDispatchTo(value as string);
  };

  const hasErrors = () => {
    let courierError = '';
    let noteNumberError = '';
    const validationErrors = [];

    if (!courier) {
      courierError = 'Need to select a courier to proceed.';
      validationErrors.push(courierError);
    }

    if (!noteNumber) {
      noteNumberError = 'Consignment Note number cannot be empty.';
      validationErrors.push(noteNumberError);
    }

    setErrors({
      ...errors,
      courier: courierError,
      noteNumber: noteNumberError,
    });

    return !!validationErrors.length;
  };

  const dispatchItem = () => {
    if (hasErrors()) return;

    const data = {
      courier,
      noteNumber,
      comments,
    };

    dispatch(saveCaseActionItems(props.jobId, 'dispatchReadyNote', data));
  };

  const renderCustomerDetails = () => {
    if (!customerDetails || dispatchTo === toStore ) {
      return null;
    }

    const customerData = Object.keys(customerDetails).map(key => {
      return { dataKey: key, dataValue: customerDetails[key] }
    })
    
    return (
      <div className="dispatch-customer">
        <Typography variant="h1">Customer Details</Typography>
        <DetailCard details={customerData} />
        <div className="note">
          <Typography variant="h5">
            To be Sent Back to the Customer
          </Typography>
          <Typography>
            To send this product directly to the customer, please complete the 
            section below. <br/><strong>NOTE: &nbsp;</strong> Once the form
            has been completed, an email notification will be sent to the
            customer.
          </Typography>
        </div>
      </div>
    );
  };

  const renderSendStoreNote = () => {
    if (dispatchTo === toCustomer) return null;
    
    return (
      <div className="store-note">
        <Typography variant="h5">
          To be Sent Back to the Store
        </Typography>
        <Typography>
          To send this product to the store, please complete the 
          section below.
        </Typography>
      </div>
    );
  };

  const getFormClasses = () => {
    let classes = 'form-item-section with-dispatch';

    if (dispatchTo === toCustomer) {
      classes = `${classes} customer`
    }

    if (dispatchTo === toStore) {
      classes = `${classes} store`
    }

    return classes;
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">
          When item is ready for dispatch, complete this section
        </Typography>
      </div>
      <div className={getFormClasses()}>
        <RadioGroup
          value={dispatchTo}
          onChange={onChangeDispatch}
          items={dispatchOptions}
        />
        {renderCustomerDetails()}
        {renderSendStoreNote()}
        <Select
          label="Select the courier"
          value={courier}
          options={COURIERS}
          onChange={onChangeCourier}
          helpText={errors.courier}
          hasError={!!errors.courier}
        />
        <TextField
          type="number"
          label="Consignment Note Number"
          value={noteNumber}
          onChange={onChangeNoteNumber}
          helperText={errors.noteNumber}
          hasError={!!errors.noteNumber}
        />
        <TextArea
          label="Please enter any additional comments"
          value={comments}
          onChange={onChangeComments}
          helpText={errors.comments}
          error={!!errors.comments}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={dispatchItem}
          fullWidth
        >
          Item Dispatched
        </Button>
      </div>
    </div>
  )
}

export default memo(DispatchReadyForm);
