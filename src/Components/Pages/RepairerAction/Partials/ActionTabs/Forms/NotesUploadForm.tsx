import { memo, useState, useEffect, ChangeEvent } from "react";
import { Typography, TextArea, Button, Upload } from "../../../../../UI";
import { CommonObjType, FileUploadType, NoteFormType } from "../../../../../../CustomTypes";

type FormType = {
  jobId: string,
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
  const { currentValues } = props;

  const [notes, setNotes] = useState('');
  const [noteFile, setNoteFile] = useState<File| null>(null);
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

  const hasErrors = () => {
    let notesError = '';
    let fileError = '';
    const validationErrors = [];

    if (!notes) {
      notesError = 'Please enter a note.';
      validationErrors.push(notesError);
    }

    if (!noteFile) {
      fileError = 'Please add a file.';
      validationErrors.push(fileError);
    }

    setErrors({
      ...errors,
      notes: notesError,
      noteFile: fileError,
    });

    return !!validationErrors.length;
  };

  const saveNotes = () => {
    if (hasErrors()) return;
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
        <Upload
          variant="outlined"
          onUpload={onFileUpload}
          beforeUpload={beforeUpload}
          emptyError={errors.noteFile}
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
