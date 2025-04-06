import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from '../../../Components/UI';
import { FileUploadType } from '../../../CustomTypes';
import './styles.scss'

const allowedType = [
  'image/jpeg',
  'image/png',
  'image/gif',
];

const onFileUploaded = (files: FileUploadType) => {
  if (!files) return;

  alert(files[0].name)
};

const beforeUpload = (fileList: FileUploadType) => {
  const file = fileList && fileList[0];

  if (!file) return '';

  if (!allowedType.includes(file.type)) {
    return 'An Invalid File Type';
  }

  return '';
};

const meta = {
  title: 'UI Components/Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Upload component'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon of the Upload Button',

    },
  },
  args: {
    text: 'Upload',
    onUpload: onFileUploaded
  },
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Upload',
    onUpload: onFileUploaded
  },
};

export const RejectInvalid: Story = {
  args: {
    text: 'Upload Image',
    beforeUpload: beforeUpload,
    onUpload: onFileUploaded
  },
};
