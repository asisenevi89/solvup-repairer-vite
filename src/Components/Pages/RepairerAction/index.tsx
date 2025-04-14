import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import _startCase from 'lodash/startCase';
import SmsIcon from '@mui/icons-material/SmsOutlined';
import { fetchCaseById, fetchCaseRequestNotes } from "../../../ActionCreators/CaseAction";
import { makeRequestNotes, makeRequestNotesLoading } from "../../../Slices/CaseAction";
import { Grid, Typography } from "../../UI";
import DetailCard from "../../Common/DetailCard";
import ImageText from "../../Common/ImageText";
import Spinner from "../../Common/Spinner";
import SummaryTabs from "./Partials/SummaryTabs";
import { toRealDate } from "../../../Utils/Helpers";
import { CommonObjType, RequestNoteType } from "../../../CustomTypes";
import ActionTabs from "./Partials/ActionTabs";
import './styles.scss'

const dateFields = ['updated']

const RepairerAction = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const requestNotes: RequestNoteType[] = useSelector(makeRequestNotes);
  const notesLoading = useSelector(makeRequestNotesLoading);

  useEffect(() => {
    if (!params.id) return;

    dispatch(fetchCaseById(params.id));
    dispatch(fetchCaseRequestNotes(params.id));
  }, [params.id]);


  const getDetailCardData = (data: CommonObjType) => {
    const { _id, jobId, ...restData } = data;

    return Object.keys(restData).map(key => (
      {
        dataKey: _startCase(key),
        dataValue: dateFields.includes(key) ? toRealDate(data[key]) : data[key],
      } 
    ));
  };

  return (
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
            <ImageText
              className="notes-heading"
              image={<SmsIcon className="notes-icon"/>}
              text={<Typography variant="h3">Request Notes</Typography>}
            />
            <Spinner backdropProps={{ open: notesLoading }}>
              <div className="note-items">
                {requestNotes.map((requestNote, index) => (
                  <DetailCard
                    key={`request-note-${index}`}
                    details={getDetailCardData(requestNote)}/>
                ))}
              </div>
            </Spinner>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default memo(RepairerAction);
