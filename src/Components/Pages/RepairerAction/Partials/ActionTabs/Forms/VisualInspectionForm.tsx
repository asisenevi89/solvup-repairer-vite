import { ChangeEvent, memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Info as InfoIcon,
  ArrowForwardIos as NextIcon,
  ArrowBackIos as PrevIcon,
} from "@mui/icons-material";
import _startCase from "lodash/startCase";
import {
  Typography, 
  TextArea,
  Alert,
  RadioGroup,
  Button,
  TextField,
 } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { VisualInspectionType, CommonObjType } from "../../../../../../CustomTypes";
import { DEFAULT_CURRENCY as currency } from "../../../../../../Utils/Constants";

type FormType = {
  jobId: string,
  currentValues: VisualInspectionType | undefined
}

const defaultErrors: CommonObjType = {
  details: ''
};

const sectionLiability = 'liability';
const sectionPrice = 'price';
const sectionDetails = 'details';

const consumer = 'consumer';
const vender = 'vender';

const liabilityOptions = [vender, consumer];

const sections = [sectionLiability, sectionPrice, sectionDetails];

const VisualInspectionForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues } = props;

  const [selectedSection, setSelectedSection] = useState(0);
  const [liabilityType, setLiabilityType] = useState(consumer);
  const [reasonForChange, setReasonForChange] = useState('')
  const [partsPrice, setPartsPrice] = useState(0);
  const [labourPrice, setLabourPrice] = useState(0);
  const [returnFreight, setReturnFreight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    setLiabilityType(currentValues.liabilityType);
    setReasonForChange(currentValues.reasonForChange);
    setPartsPrice(currentValues.partsPrice);
    setLabourPrice(currentValues.labourPrice);
    setReturnFreight(currentValues.returnFreight);
    setTotalPrice(currentValues.totalPrice);
    setReferenceNumber(currentValues.referenceNumber || '');
    setDetails(currentValues.details);
    setSelectedSection(0);
  }, [currentValues]);


  useEffect(() => {
    const total = partsPrice + labourPrice + returnFreight;
    setTotalPrice(total);
  }, [partsPrice, labourPrice, returnFreight]);

  const onChangeReason = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReasonForChange(value);
  };

  const onLiabilityChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLiabilityType(value);
  };

  const onChangePartsPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPartsPrice(Number(value));
  };

  const onChangeLabourPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLabourPrice(Number(value));
  };

  const onChangeReturnFreight = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReturnFreight(Number(value));
  };

  const onChangeReferenceNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReferenceNumber(value);
  };

  const onChangeDetails = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDetails(value);
    setErrors({
      ...errors,
      details: '',
    });
  };

  const getLiabilityOptions = () => (
    liabilityOptions.map(item => ({value: item, label: _startCase(item)}))
  );

  const hasErrors = () => {
    let detailsError = '';
    const validationErrors = [];

    if (!details) {
      detailsError = 'Work details cannot be empty.';
      validationErrors.push(detailsError);
    }

    setErrors({
      ...errors,
      details: detailsError,
    });

    return !!validationErrors.length;
  };

  const saveDate = () => {
    if (hasErrors()) return;

    const data = {
      liabilityType,
      reasonForChange,
      partsPrice,
      labourPrice,
      returnFreight,
      totalPrice,
      referenceNumber,
      details,
    };

    dispatch(saveCaseActionItems(jobId, 'visualInspection', data));
  };

  const nextStep = () => {
    const newStep = selectedSection + 1
    const nextValue = newStep > (sections.length -1) ?  (sections.length -1) : newStep;
    setSelectedSection(nextValue);
  };

  const prevStep = () => {
    const newStep = selectedSection - 1
    const nextValue = newStep < 0 ?  0 : newStep;
    setSelectedSection(nextValue);
  };

  const prevDisabled = () => !selectedSection;

  const nextDisabled = () => {
    const section = sections[selectedSection];

    if (section === sectionDetails) return true;

    if (section === sectionLiability) return !reasonForChange;

    if (section === sectionPrice) return !totalPrice;
  };

  const getCurrencyTag = 
    <Typography variant="h3" className="currency-tag">{currency}</Typography>

  const renderLiabilitySection = () => (
    <>
      <Alert severity="info" className="alert-section" icon={<InfoIcon className="alert-icon" />}>
        <Typography className="alert-text">
          'Consumer' means that the repairer will be changing all the costs associated &nbsp;
          with repairer to the end customer;
        </Typography>
      </Alert>
      <RadioGroup
        value={liabilityType}
        onChange={onLiabilityChanged}
        items={getLiabilityOptions()}
      />
      <TextField
        value={reasonForChange}
        onChange={onChangeReason}
        label='Reason for Change'
        required
      />
    </>
  );

  const renderPriceSection = () => (
    <>
      <Typography variant="h5" color="error">
        All parts are GST Inclusive
      </Typography>
      <TextField 
        type="number"
        slotProps={{ input: { startAdornment: getCurrencyTag }}}
        label="Parts (GST Inc.)"
        value={partsPrice}
        onChange={onChangePartsPrice}
      />
      <TextField 
        type="number"
        slotProps={{ input: { startAdornment: getCurrencyTag }}}
        label="Labour (GST Inc.)"
        value={labourPrice}
        onChange={onChangeLabourPrice}
      />
      <TextField 
        type="number"
        slotProps={{ input: { startAdornment: getCurrencyTag }}}
        label="Return Freight (GST Inc.)"
        value={returnFreight}
        onChange={onChangeReturnFreight}
      />
      <TextField 
        disabled
        type="number"
        slotProps={{ input: { startAdornment: getCurrencyTag }}}
        label="Total (GST Inc.)"
        value={totalPrice}
        required
      />
    </>
  );

  const renderDetailsSection = () => (
    <>
      <TextField
        label="Repairer Internal Reference Number (Optional)"
        value={referenceNumber}
        onChange={onChangeReferenceNumber}
      />
      <TextArea
        label="Please enter the details of work to be performed"
        value={details}
        onChange={onChangeDetails}
        helpText={errors.details}
        hasError={!!errors.details}
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={saveDate}
        fullWidth
      >
        Submit
      </Button>
    </>
  )

  const renderSection = () => {
    const section = sections[selectedSection];

    if (section === sectionLiability) {
      return renderLiabilitySection();
    }

    if (section === sectionPrice) {
      return renderPriceSection();
    }

    if (section === sectionDetails) {
      return renderDetailsSection();
    }

    return null;
  };

  return (
    <div className={`tab-form visual-inspection ${sections[selectedSection]}`}>
      <div className="header-section">
        <Typography variant="h3">
          Visual Inspection
        </Typography>
      </div>
      <div className="next-prev-btn">
        <Button 
          color="primary"
          startIcon={<PrevIcon />}
          onClick={prevStep}
          disabled={prevDisabled()}
        >
          Previous
        </Button>
        <Button
          color="primary"
          endIcon={<NextIcon />}
          onClick={nextStep}
          disabled={nextDisabled()}
        >
          Next
        </Button>
      </div>
      <div className="form-item-section">
        {renderSection()}
      </div>
    </div>
  )
}

export default memo(VisualInspectionForm);
