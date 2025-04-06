import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _get from 'lodash/get';
import ConsignmentForm from "../Forms/ConsignmentForm";
import AssessmentDateForm from "../Forms/AssessmentDateForm";
import CheckInItemForm from "../Forms/CheckInItemForm";
import VisualInspectionForm from "../Forms/VisualInspectionForm";
import {
  makeSelectedJob,
  makeJobActionItems, 
  makeJobActionItemsLoading,
} from "../../../../../../Slices/CaseAction";
import { fetchCaseActionItems } from "../../../../../../ActionCreators/CaseAction";
import { CommonObjType, JobActionItemsType } from "../../../../../../CustomTypes";
import { Stepper } from "../../../../../UI";
import Spinner from "../../../../../Common/Spinner";
import RectificationForm from "../Forms/RectificationForm";
import ConfirmAssessmentFrom from "../Forms/ConfirmAssessmentFrom";
import AssessmentOutcomeForm from "../Forms/AssessmentOutcomeForm";
import RepairAssessmentOutcomeForm from "../Forms/RepairAssessmentOutcomeForm";
import ProvideAQuoteForm from "../Forms/ProvideAQuoteForm";
import ConfirmPickupForm from "../Forms/ConfirmPickupForm";
import ResponseAwaitedFrom from "../Forms/ResponseAwaitedForm"

// has DynamicContent
import PartsOnOrderForm from "../Forms/PartsOnOrderForm";
import DispatchReadyForm from "../Forms/DispatchReadyForm";
import PickupItemForm from "../Forms/PickupItemForm";
import CheckInItemNotesForm from "../Forms/CheckInItemNotesForm";

import { customerDetails } from "../../../../../../Utils/DummyData";

const consignmentForm = 'consignmentForm';
const assessmentForm = 'assessmentForm';
const checkInForm = 'checkInForm';
const checkInItemDateForm = 'checkInFormDate';
const visualInspectionForm = 'visualInspectionForm';
const rectificationForm = 'rectificationForm';
const rectificationFormSQT = 'rectificationFormSQT';
const confirmAssessmentForm = 'confirmAssessmentForm';
const assessmentOutcomeForm = 'assessmentOutcomeForm'
const repairAssessmentOutcomeForm = 'repairAssessmentOutcomeForm';
const provideQuoteForm = 'provideQuoteForm';
const confirmPickupForm = 'confirmPickupForm';
const partsOnOrderForm = 'partsOnOrderForm';
const partsOnOrderFormDate = 'partOnOrderFormDate';
const dispatchReadyForm = 'dispatchReadyForm';
const pickupItemForm = 'pickupItemForm';
const pickupItemNotesForm = 'pickupItemNotesForm';
const checkInItemNoteFrom = 'checkInItemNoteForm';
const checkInItemRefForm = 'checkInItemRefForm';
const responseAwaitedForm = 'responseAwaitedFrom';

const showStepper = false;

const formSteps: CommonObjType = {
  [consignmentForm]: 'Send Consignment Note',
  [assessmentForm]: 'Submit Assessment',
  [checkInForm]: 'Submit Check-In',
  [visualInspectionForm]: 'Visual Inspection',
  [rectificationForm]: 'Rectification'
};

const NextActionTab = () => {
  const dispatch = useDispatch();

  const selectedJob= useSelector(makeSelectedJob);
  const actionItems: JobActionItemsType = useSelector(makeJobActionItems);
  const actionItemsLoading = useSelector(makeJobActionItemsLoading);

  const selectedJobId = _get(selectedJob, 'id', '');
  const consignmentNote = actionItems.consignmentNote;
  const assessmentDate = actionItems.assessmentDate;
  const checkInItem = actionItems.checkInItem;
  const visualInspection = actionItems.visualInspection;
  const rectification = actionItems.rectification;
  const confirmAssessment = actionItems.confirmAssessment;
  const assessmentOutcome = actionItems.assessmentOutcome;
  const repairAssessmentOutcome = actionItems.repairAssessmentOutcome;
  const provideQuote = actionItems.provideAQuote;
  const confirmPickup = actionItems.pickupConfirm;
  const partsOnOrder = actionItems.partsOnOrder;
  const dispatchReady = actionItems.dispatchReadyNote;
  const pickupItem = actionItems.pickupItem;

  const [selectedForm, setSelectedForm] = useState(consignmentForm);

  useEffect(() => {
  if (!selectedJobId) return;

  dispatch(fetchCaseActionItems(selectedJobId));
  }, [selectedJobId]);

  useEffect(() => {
    if (!consignmentNote) {
      setSelectedForm(consignmentForm);
      return;
    }

    if (!assessmentDate) {
      setSelectedForm(assessmentForm);
      return;
    }

    if (!checkInItem) {
      setSelectedForm(checkInForm);
      return;
    }

    if (checkInItem && !checkInItem.date) {
      setSelectedForm(checkInItemDateForm);
      return;
    }

    if (!visualInspection) {
      setSelectedForm(visualInspectionForm);
      return;
    }

    if (!rectification) {
      setSelectedForm(rectificationForm);
      return;
    }

    if (rectification && rectification.isCompletedAtQuotedRate === undefined) {
      setSelectedForm(rectificationFormSQT);
      return;
    }

    if (!confirmAssessment) {
      setSelectedForm(confirmAssessmentForm);
      return;
    }

    if (!assessmentOutcome) {
      setSelectedForm(assessmentOutcomeForm);
      return;
    }

    if (!repairAssessmentOutcome) {
      setSelectedForm(repairAssessmentOutcomeForm);
      return;
    }

    if (!provideQuote) {
      setSelectedForm(provideQuoteForm);
      return;
    }

    if (!confirmPickup) {
      setSelectedForm(confirmPickupForm);
      return;
    }

    if (!partsOnOrder) {
      setSelectedForm(partsOnOrderForm);
      return;
    }

    if (partsOnOrder && !partsOnOrder.submitted) {
      setSelectedForm(partsOnOrderFormDate);
      return;
    }

    if (!dispatchReady) {
      setSelectedForm(dispatchReadyForm);
      return;
    }
 
    if (!pickupItem) {
      setSelectedForm(pickupItemForm);
      return;
    }

    if (pickupItem && !pickupItem.notes) {
      setSelectedForm(pickupItemNotesForm);
      return;
    }

    if (checkInItem && !checkInItem.notes) {
      setSelectedForm(checkInItemNoteFrom)
      return;
    }

    if (checkInItem && !checkInItem.referenceNumber) {
      setSelectedForm(checkInItemRefForm)
      return;
    }

    setSelectedForm(responseAwaitedForm);

  }, [
    consignmentNote,
    assessmentDate,
    checkInItem,
    visualInspection,
    rectification,
    confirmAssessment,
    assessmentOutcome,
    repairAssessmentOutcome,
    provideQuote,
    confirmPickup,
    partsOnOrder,
    dispatchReady,
    pickupItem,
  ]);


  const onChangeStep = (newStep: string ) => {
    setSelectedForm(newStep)
  };

  const isStepCompleted = (key: string) => {
    switch( key) {
      case consignmentForm:
        return !!consignmentNote;
      case assessmentForm:
        return !!assessmentDate;
      case checkInForm:
        return !!checkInItem;
      case visualInspectionForm:
        return !!visualInspection;
      case rectificationForm:
        return !!rectification;
      default:
        return false;
    };
  } ;

  const isStepBlocked = (key: string) => {
    if (key === assessmentForm) {
      return !consignmentNote
    }

    if (key === checkInForm) {
      return !assessmentDate
    }

    if (key === visualInspectionForm) {
      return !checkInItem;
    }

    if (key === rectificationForm ) {
      return !visualInspection;
    }

    return false;
  };

 const getSteps = () => (
    Object.keys(formSteps).map(key => (
      {
        value: key,
        label: formSteps[key],
        completed: isStepCompleted(key),
        disabled: isStepBlocked(key),
      }
    ))
  );

  const getStepId = () => {
    const stepsKeys = Object.keys(formSteps);

    return stepsKeys.findIndex(key => key === selectedForm);
  };

  const toChangeLiability = () => {
    setSelectedForm(visualInspectionForm);
  };


  const renderForm = () => {
    if (selectedForm === consignmentForm) {
      return (
        <ConsignmentForm
          jobId={selectedJobId}
          currentValues={consignmentNote}
        />
      );
    }

    if (selectedForm === assessmentForm) {
      return (
        <AssessmentDateForm
          jobId={selectedJobId}
          currentValues={assessmentDate}
        />
      );
    }

    if (selectedForm === checkInForm ) {
      return (
        <CheckInItemForm
          jobId={selectedJobId}
          currentValues={checkInItem}
          hideDate
        />
      );
    }

    if (selectedForm === checkInItemDateForm ) {
      return (
        <CheckInItemForm
          jobId={selectedJobId}
          currentValues={checkInItem}
          hideDate={false}
        />
      );
    }

    if (selectedForm === visualInspectionForm) {
      return (
        <VisualInspectionForm
          jobId={selectedJobId}
          currentValues={visualInspection}
        />
      );
    }

    if (selectedForm === rectificationForm) {
      return (
        <RectificationForm
          jobId={selectedJobId}
          currentValues={rectification}
          liability={visualInspection?.liabilityType}
          toLiabilityChange={toChangeLiability}
        />
      );
    }

    if (selectedForm === rectificationFormSQT) {
      return (
        <RectificationForm
          jobId={selectedJobId}
          currentValues={rectification}
          liability={visualInspection?.liabilityType}
          toLiabilityChange={toChangeLiability}
          isSQT
        />
      );
    }

    if (selectedForm === confirmAssessmentForm) {
      return (
        <ConfirmAssessmentFrom
          jobId={selectedJobId}
          currentValues={confirmAssessment}
        />
      );
    }

    if (selectedForm === assessmentOutcomeForm) {
      return (
        <AssessmentOutcomeForm
          jobId={selectedJobId}
          currentValues={assessmentOutcome}
        />
      );
    }

    if (selectedForm === repairAssessmentOutcomeForm) {
      return (
        <RepairAssessmentOutcomeForm
          jobId={selectedJobId}
          currentValues={repairAssessmentOutcome}
        />
      );
    }

    if (selectedForm === provideQuoteForm) {
      return (
        <ProvideAQuoteForm
          jobId={selectedJobId}
          currentValues={provideQuote}
        />
      );
    }
 
    if (selectedForm === confirmPickupForm) {
      return (
        <ConfirmPickupForm
          jobId={selectedJobId}
          currentValues={confirmPickup}
        />
      );
    }

    if (selectedForm === partsOnOrderForm) {
      return (
        <PartsOnOrderForm
          jobId={selectedJobId}
          currentValues={partsOnOrder}
          showAlert
        />
      );  
    }

    if (selectedForm === partsOnOrderFormDate) {
      return (
        <PartsOnOrderForm
          jobId={selectedJobId}
          currentValues={partsOnOrder}
          showAlert={false}
          showDate
        />
      );  
    }

    if (selectedForm === dispatchReadyForm) {
      return (
        <DispatchReadyForm
          jobId={selectedJobId}
          currentValues={dispatchReady}
          customerDetails={customerDetails}
        />
      ); 
    }

    if (selectedForm === pickupItemForm) {
      return (
        <PickupItemForm
          jobId={selectedJobId}
          currentValues={pickupItem}
          hasNotes={false}
        />
      );
    }

    if (selectedForm === pickupItemNotesForm) {
      return (
        <PickupItemForm
          jobId={selectedJobId}
          currentValues={pickupItem}
          hasNotes
          itemLink="DDD"
        />
      );
    }

    if (selectedForm === checkInItemNoteFrom) {
      return (
        <CheckInItemNotesForm
          jobId={selectedJobId}
          currentValues={checkInItem}
          hasReference={false}
        />
      );
    }

    if (selectedForm === checkInItemRefForm) {
      return (
        <CheckInItemNotesForm
          jobId={selectedJobId}
          currentValues={checkInItem}
          hasReference={true}
        />
      );
    }

    return <ResponseAwaitedFrom />
  };

  return (
    <Spinner backdropProps={{ open: actionItemsLoading || !selectedJobId}}>
      <div className="action-wrapper" >
        <div className="action-tab">
          {renderForm()}
        </div>
        {showStepper && (
          <div className="action-stepper">
            <Stepper
              wrapperClass=""
              orientation="vertical"
              steps={getSteps()}
              onStepClick={onChangeStep}
              activeStep={getStepId()}
              nonLinear
            />
          </div>
        )}
      </div>
    </Spinner>
  );
};

export default memo(NextActionTab);
