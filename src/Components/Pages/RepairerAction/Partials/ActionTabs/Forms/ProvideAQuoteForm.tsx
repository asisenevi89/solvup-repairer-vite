import { memo, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Typography, Button, RadioGroup, TextArea, TextField } from "../../../../../UI";
import { saveCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { CommonObjType, ProvideAQuoteType } from "../../../../../../CustomTypes";
import {
  DEFAULT_CURRENCY as currency,
  DEFAULT_GST as defaultGst,
} from "../../../../../../Utils/Constants";

type FormType = {
  jobId: string,
  currentValues: ProvideAQuoteType | undefined;
  gstPercentage?: number;
};

const atJobRate = 'atJobRate';
const atQuote = 'atQuote';
const quoteOptions = [
  { value: atJobRate, label: 'At the completed job rate.' },
  { value: atQuote, label: 'I need to provide a quote.' },
];

const defaultErrors: CommonObjType = {
  totalWithGST: '',
  details: '',
};

const ProvideAQuoteForm = (props: FormType) => {
  const dispatch = useDispatch();

  const { jobId, currentValues, gstPercentage = defaultGst } = props;

  const [isQuoted, setIsQuoted] = useState(false);
  const [partsPrice, setPartsPrice] = useState(0);
  const [labourPrice, setLabourPrice] = useState(0);
  const [freightPrice, setFreightPrice] = useState(0);
  const [travelPrice, setTravelPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalWithGST, setTotalWithGST] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;

    setIsQuoted(currentValues.isQuoted);
    setPartsPrice(currentValues.partsPrice || 0);
    setLabourPrice(currentValues.labourPrice || 0);
    setFreightPrice(currentValues.freightPrice || 0);
    setTravelPrice(currentValues.travelPrice || 0);
    setTotalPrice(currentValues.totalPrice || 0);
    setGst(currentValues.gst || 0);
    setTotalWithGST(currentValues.totalWithGST || 0);
    setReferenceNumber(currentValues.referenceNumber || '');
    setDetails(currentValues.details || '')
  }, [currentValues]);

  useEffect(() => {
    const total = partsPrice + labourPrice + freightPrice + travelPrice;
    const gstAmount = (total * gstPercentage) / 100;
    const totalPlusGST = total + gstAmount;

    setTotalPrice(total);
    setGst(gstAmount)
    setTotalWithGST(totalPlusGST);
    setErrors({
      ...errors,
      totalWithGST: '',
    });
  }, [partsPrice, labourPrice, freightPrice, travelPrice]);

  const onChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const type = value === atQuote;
    setIsQuoted(type);
  };

  const onChangeDetails = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDetails(value);
    setErrors({
      ...errors,
      details: '',
    });
  };

  const hasErrors = () => {
    let detailsError = '';
    let totalError = '';
    const validationErrors = [];

    if (isQuoted && !totalWithGST ) {
      totalError = 'Total price for quote cannot be empty';
      validationErrors.push(totalError);
    }

    if (isQuoted && !details) {
      detailsError = 'Total price for quote cannot be empty';
      validationErrors.push(totalError);
    }

    setErrors({
      ...errors,
      details: detailsError,
      totalWithGST: totalError,
    });

    return !!validationErrors.length;
  };


  const onConfirm = () => {
    if (hasErrors()) return;

    const data = {
      isQuoted,
      partsPrice,
      labourPrice,
      freightPrice,
      travelPrice,
      totalPrice,
      referenceNumber,
      details,
    };

    dispatch(saveCaseActionItems(jobId, 'provideAQuote', data));
  };

  const onChangePartsPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPartsPrice(Number(value));
  };

  const onChangeLabourPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLabourPrice(Number(value));
  };

  const onChangeFreightPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFreightPrice(Number(value));
  };

  const onChangeTravelPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTotalPrice(Number(value));
  };

  const onChangeReferenceNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReferenceNumber(value);
  };

  const getCurrencyTag = 
    <Typography variant="h3" className="currency-tag">{currency}</Typography>


  const renderPriceSection = () => {
    if (!isQuoted) return null;

    return (
      <>
        <Typography variant="h5" color="error">
          All parts are GST Exclusive
        </Typography>
        <TextField 
          type="number"
          slotProps={{ input: { startAdornment: getCurrencyTag }}}
          label="Parts"
          value={partsPrice}
          onChange={onChangePartsPrice}
        />
        <TextField 
          type="number"
          slotProps={{ input: { startAdornment: getCurrencyTag }}}
          label="Labour"
          value={labourPrice}
          onChange={onChangeLabourPrice}
        />
        <TextField 
          type="number"
          slotProps={{ input: { startAdornment: getCurrencyTag }}}
          label="Freight"
          value={freightPrice}
          onChange={onChangeFreightPrice}
        />
        <TextField 
          type="number"
          slotProps={{ input: { startAdornment: getCurrencyTag }}}
          label="Travel"
          value={travelPrice}
          onChange={onChangeTravelPrice}
        />
        <TextField 
          disabled
          type="number"
          slotProps={{ input: { startAdornment: getCurrencyTag }}}
          label="Total"
          value={totalPrice}
          required
        />
        <TextField 
          disabled
          type="number"
          slotProps={{ input: { startAdornment: getCurrencyTag }}}
          label="GST"
          value={gst}
          required
          fullWidth
        />
        <TextField 
          className="total-with-gst"
          disabled
          type="number"
          slotProps={{ input: { startAdornment: getCurrencyTag }}}
          label="Total (GST Inc)"
          value={totalWithGST}
          required
          error={!!errors.totalWithGST}
          helperText={errors.totalWithGST}
        />
      </>
    );
  };

  const renderDetailsSection = () => {
    if (!isQuoted) return null;

    return (
      <>
        <TextField
          label="Repairer Internal Reference Number (Optional)"
          value={referenceNumber}
          onChange={onChangeReferenceNumber}
        />
        <TextArea
          label="Please enter the details of work to be performed to fix unit"
          value={details}
          onChange={onChangeDetails}
          helpText={errors.details}
          hasError={!!errors.details}
          required
        />
      </>
    );
  };

  const getFormClasses = () => {
    let classes = 'form-item-section with-provide-quote';

    if (isQuoted) {
      classes = 'form-item-section with-provide-quote has-quote';
    }

    return classes;
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Provide a Quote</Typography>
      </div>
      <div className="info-section ">
        <Typography variant="h4">
          Please Provide a quote
        </Typography>
      </div>
      <div className={getFormClasses()}>
        <RadioGroup
          value={isQuoted ? atQuote : atJobRate }
          onChange={onChangeType}
          items={quoteOptions}
        />
        {renderPriceSection()}
        {renderDetailsSection()}
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default memo(ProvideAQuoteForm);
