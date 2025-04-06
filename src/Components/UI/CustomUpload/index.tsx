import { useState, memo, ReactNode, ChangeEvent, useEffect } from 'react';
import Input from '@mui/material/Input';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import { FileUploadType } from '../../../CustomTypes';

export interface CustomUploadProps extends ButtonProps {
  icon?: ReactNode;
  text?: string;
  wrapperClass?: string,
  emptyError?: string,
  onUpload: (files: FileUploadType) => void
  onRemoveFile?: (fileName: string) => void;
  beforeUpload?: (files: FileUploadType) => string
};

const CustomUpload = (props: CustomUploadProps) => {

  const {
    text,
    icon = <CloudUploadIcon />,
    emptyError = '',
    onUpload,
    onRemoveFile,
    beforeUpload,
    wrapperClass,
    ...uploadProps
  } = props;

  const [currentFile, setCurrentFile] = useState('');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    setFileError(emptyError);
  }, [emptyError]);

  const fileEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || !files.length) {
      setCurrentFile('');
      onUpload(files);
      return;
    }

    const uploadErrors = beforeUpload && beforeUpload(files);
    if (uploadErrors) {
      setCurrentFile('');
      setFileError(uploadErrors);
      return;
    }

    setFileError('');
    setCurrentFile(files[0].name);
    onUpload(files);
  };

  const removeFile = () => {
    setCurrentFile('');

    if (onRemoveFile) {
      onRemoveFile(currentFile);
    }
  };

  return (
    <div className={`file-upload ${wrapperClass}`}>
      <Button
        component='label'
        variant='contained'
        startIcon={icon}
        color={fileError ? 'error' : 'primary'}
        {...uploadProps}
      >
        { text || 'Upload' }
        <Input
          type='file'
          sx={{ display: 'none' }}
          onChange={fileEvent}
        />
      </Button>
      {currentFile && (
        <div className='uploaded-file'>
          <Typography>{currentFile}</Typography>
          <IconButton aria-label="Remove" color="error" onClick={removeFile}>
            <DeleteIcon fontSize='large' />
          </IconButton>
        </div>
      )}
      {fileError && (
        <Typography color='error'>{fileError}</Typography>
      )}
    </div> 
  );
};

export default memo(CustomUpload);
