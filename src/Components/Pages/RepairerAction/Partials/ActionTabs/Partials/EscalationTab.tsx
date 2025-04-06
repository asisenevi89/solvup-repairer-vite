import { memo } from "react";
import { useSelector } from "react-redux";
import _get from 'lodash/get';
import { makeSelectedJob } from "../../../../../../Slices/CaseAction";
import EscalationForm from "../Forms/EscalationForm";

const EscalationTab = () => {
  const selectedJob= useSelector(makeSelectedJob);
  const selectedJobId = _get(selectedJob, '_id', '');

  return (
    <div className="action-wrapper" >
      <div className="action-tab">
        <EscalationForm jobId={selectedJobId} currentValues={undefined} />
      </div>
    </div>
  )

};

export default memo(EscalationTab);
