import { memo, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import { makeRequestNotes, makeRequestNotesLoading } from "../../../../../Slices/CaseAction";
import _startCase from 'lodash/startCase';
import { toRealDate } from "../../../../../Utils/Helpers";
import { Link, Typography } from "../../../../UI";
import Spinner from "../../../../Common/Spinner";
import ImageText from "../../../../Common/ImageText";
import DetailCard from "../../../../Common/DetailCard";
import SmsIcon from '@mui/icons-material/SmsOutlined';
import { RequestNoteType, CommonObjType } from "../../../../../CustomTypes";
import { initDownloadNoteAttachment } from "../../../../../ActionCreators/CaseAction";

const dateFields = ['updated'];
const htmlFields = ['notes'];
const attachmentFields = ['attachment']

const NotesSection = () => {
  const requestNotes: RequestNoteType[] = useSelector(makeRequestNotes);
  const notesLoading = useSelector(makeRequestNotesLoading);
  const dispatch = useDispatch();

  const initDownload = (link: string) => {
    const pathSegments = new URL(link).pathname.split('/').filter(Boolean);
    const filename =  pathSegments[pathSegments.length - 1] || 'attachment';
    
    dispatch(initDownloadNoteAttachment(link, filename));
  };

  const getDetailCardData = (data: CommonObjType) => {
    const { _id, jobId, ...restData } = data;

    return Object.keys(restData).map(key => {
      let dataValue: ReactNode = restData[key];

      if (dateFields.includes(key)) {
        dataValue = toRealDate(restData[key]);
      }

      if (htmlFields.includes(key)) {
        dataValue = (
          <div
            className="html-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(restData[key]) }}
          />
        );
      }

      if (attachmentFields.includes(key)) {
        dataValue = restData[key]
          ? (
            <Link
              className="case-detail-link"
              href="#"
              onClick={() => initDownload(restData[key])}
            >
              Click to Download
            </Link>
          )
          : 'N/A';
      };

      return {
        dataKey: _startCase(key),
        dataValue,
      };
    });
  };

  return (
    <>
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
    </>
  );
};

export default memo(NotesSection);
