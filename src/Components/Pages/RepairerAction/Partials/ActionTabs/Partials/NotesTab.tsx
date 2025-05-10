import { memo } from "react";
import { useSelector } from "react-redux";
import _get from 'lodash/get';
import { makeNoteSaving, makeSelectedJob } from "../../../../../../Slices/CaseAction";
import NotesUploadForm from "../Forms/NotesUploadForm";
import Spinner from "../../../../../Common/Spinner";

const NotesTab = () => {
  const isLoading = useSelector(makeNoteSaving);
  const selectedJob= useSelector(makeSelectedJob);
  const selectedJobId = _get(selectedJob, 'id', 0);

  return (
    <Spinner backdropProps={{ open: isLoading }}>
      <div className="action-wrapper" >
        <div className="action-tab">
          <NotesUploadForm jobId={selectedJobId} currentValues={undefined} />
        </div>
      </div>
    </Spinner>
  );
};

export default memo(NotesTab);
