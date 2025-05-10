import { memo } from "react";
import { useSelector } from "react-redux";
import _get from 'lodash/get';
import { makeSelectedJob, makeCaseEscalationStatus } from "../../../../../../Slices/CaseAction";
import EscalationForm from "../Forms/EscalationForm";
import Spinner from "../../../../../Common/Spinner";

const EscalationTab = () => {
  const selectedJob= useSelector(makeSelectedJob);
  const selectedJobId = _get(selectedJob, 'id', 0);
  const isLoading = useSelector(makeCaseEscalationStatus);

  return (
    <Spinner backdropProps={{ open: isLoading }}>
      <div className="action-wrapper" >
        <div className="action-tab">
          <EscalationForm jobId={selectedJobId} currentValues={undefined} />
        </div>
      </div>
  </Spinner>
  );
};

export default memo(EscalationTab);
