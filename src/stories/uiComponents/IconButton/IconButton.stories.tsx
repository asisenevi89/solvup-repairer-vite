import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../../Components/UI';
import Download from '@mui/icons-material/Download';
import Search from '@mui/icons-material/Search';

const meta = {
  title: 'UI Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon Button component - complete prop list available at https://mui.com/material-ui/api/icon-button/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Color of the Button',
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'Size of the Button',
    },
    wrapperClass: { control: 'text', description: 'Custom Class' },
  },
  
  args: {
    size: 'medium',
    wrapper: false,
    wrapperClass: '',
    children: <Search />
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryDownload: Story = {
  args: {
    color: 'primary',
    children: <Download />,
    wrapperClass: '',
  },
};

export const SearchDisabled: Story = {
  args: {
    color: 'inherit',
    children: <Search />,
    wrapperClass: '',
    disabled: true
  },
};

export const WithBorder: Story = {
  args: {
    color: 'success',
    children: <Search />,
    wrapperClass: '',
    sx:{
      border: '1px solid',
    }
  },
};

