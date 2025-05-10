import { memo, useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  TextArea,
  Button,
  Upload,
  Checkbox,
} from "../../../../../UI";
import {
  CommonObjType,
  FileUploadType,
  NoteFormType,
} from "../../../../../../CustomTypes";
import { intiAddRequestNote } from "../../../../../../ActionCreators/CaseAction";

type FormType = {
  jobId: number,
  currentValues: NoteFormType | undefined;
};

const defaultErrors: CommonObjType = {
  notes: '',
  noteFile: '',
};

const allowedType = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
];

const ItemForm = (props: FormType) => {
  const { currentValues, jobId } = props;
  const dispatch = useDispatch();

  const [notes, setNotes] = useState('');
  const [noteFile, setNoteFile] = useState<File| null>(null);
  const [sendEmailStatus , setSendEmailStatus] = useState(false);
  const [uploadReset, setUploadReset] = useState(0);
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    if (!currentValues) return;
    
    setNotes(currentValues.notes);
  }, [currentValues]);

  const onChangeNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNotes(value);
    setErrors({ ...errors, notes: '' });
  };

  const onFileUpload = (fileList: FileUploadType) => {
    const file = fileList && fileList[0];
    setNoteFile(file)
  };

  const beforeUpload = (fileList: FileUploadType) => {
    const file = fileList && fileList[0];

    if (!file) return '';

    if (!allowedType.includes(file.type)) {
      return 'An Invalid File Type';
    }

    return '';
  };

  const onChangeSendEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setSendEmailStatus(checked);
  };

  const hasErrors = () => {
    let notesError = '';
    let fileError = '';
    const validationErrors = [];

    if (!notes) {
      notesError = 'Please enter a note.';
      validationErrors.push(notesError);
    }

    setErrors({
      ...errors,
      notes: notesError,
      noteFile: fileError,
    });

    return !!validationErrors.length;
  };

  const resetData = () => {
    setNoteFile(null);
    setNotes('');
    setSendEmailStatus(false);
    setUploadReset(Date.now());
  };

  const saveNotes = () => {
    if (hasErrors()) return;
    const formData = new FormData();

    if (noteFile) {
      formData.append('files', noteFile);
    }

    formData.append('requestId', jobId.toString());
    formData.append('notes', notes);
    formData.append('sendEmail', sendEmailStatus.toString());
    dispatch(intiAddRequestNote(formData));
    resetData();
  };

  return (
    <div className="tab-form">
      <div className="header-section">
        <Typography variant="h3">Attach a Note</Typography>
      </div>
      <div className="form-item-section with-note-upload">
        <TextArea
          label="Enter the Note Text"
          value={notes}
          onChange={onChangeNotes}
          helpText={errors.notes}
          error={!!errors.notes}
        />
        <Checkbox
          value="send"
          checked={sendEmailStatus}
          onChange={onChangeSendEmail}
          label={<Typography variant="h4">Send an email notification</Typography>}
        />
        <Upload
          variant="outlined"
          onUpload={onFileUpload}
          beforeUpload={beforeUpload}
          emptyError={errors.noteFile}
          resetCounter={uploadReset}
        />
        <div className="upload-info">
          <Typography>Permitted file types: JGP, PNG, GIF and PDF</Typography>
          <Typography>
            <strong>Note:</strong> &nbsp; Alter selecting a file you can remove it by clicking on Remove button 
            or replace it by uploading another file.
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={saveNotes}
          fullWidth
        >
          Add Note
        </Button>
      </div>
    </div>
  )
}

export default memo(ItemForm);
