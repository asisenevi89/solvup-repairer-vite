import { memo } from "react";
import { useSelector } from "react-redux";
import _get from 'lodash/get';
import { makeSelectedJob } from "../../../../../../Slices/CaseAction";
import NotesUploadForm from "../Forms/NotesUploadForm";

const NotesTab = () => {
  const selectedJob= useSelector(makeSelectedJob);
  const selectedJobId = _get(selectedJob, '_id', '');

  return (
    <div className="action-wrapper" >
      <div className="action-tab">
        <NotesUploadForm jobId={selectedJobId} currentValues={undefined} />
      </div>
    </div>
  )

};

export default memo(NotesTab);
