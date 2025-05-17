import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import _startCase from 'lodash/startCase';
import { fetchCaseById, initFetchCaseRequestNotes } from "../../../ActionCreators/CaseAction";
import { Grid, Typography } from "../../UI";
import SummaryTabs from "./Partials/SummaryTabs";
import ActionTabs from "./Partials/ActionTabs";
import NotesSection from "./Partials/NotesSection";
import { makeAttachmentDownloading } from "../../../Slices/CaseAction";
import Spinner from "../../Common/Spinner";
import './styles.scss';

const RepairerAction = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const isFileDownloading = useSelector(makeAttachmentDownloading);

  useEffect(() => {
    if (!params.id) return;

    dispatch(fetchCaseById(params.id));
    dispatch(initFetchCaseRequestNotes(params.id));
  }, [params.id]);

  return (
    <Spinner backdropProps={{ open: isFileDownloading }}>
      <div className="job-action-container">
        <div className="page-heading">
          <Typography variant="h1">Case Id: <span>{params.id}</span></Typography>
        </div>
        <div className="action-body">
          <Grid container size={12} spacing={4} wrapper={false} className="action-grid">
            <Grid  size={{ xs: 12, lg: 8 }} wrapper={false} className="tab-section">
              <SummaryTabs />
              <ActionTabs />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }} wrapper={false} className="notes-section">
              <NotesSection />
            </Grid>
          </Grid>
        </div>
      </div>
    </Spinner>
  )
};

export default memo(RepairerAction);
