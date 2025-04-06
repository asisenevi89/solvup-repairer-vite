import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../Components/UI';
import Download from '@mui/icons-material/Download';
import Search from '@mui/icons-material/Search';

const meta = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component - complete prop list available at https://mui.com/material-ui/api/button/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'text', description: 'Variant of the Button' },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Color of the Button',
    },
    wrapperClass: { control: 'text', description: 'Custom Class' },
    children: { control: 'text', description: 'Button text or content' }
  },
  
  args: {
    variant: 'contained',
    wrapperClass: '',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContainedPrimary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Primary Button',
    wrapperClass: '',
  },
};

export const OutlinedSuccess: Story = {
  args: {
    variant: 'outlined',
    color: 'success',
    children: 'Success Button',
    wrapperClass: '',
  },
};

export const TextError: Story = {
  args: {
    variant: 'text',
    color: 'error',
    children:'Error Button',
    wrapperClass: '',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'outlined',
    color: 'warning',
    children:'Disabled Button',
    wrapperClass: '',
    disabled: true,
  },
};

export const StartIcon: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children:'Download',
    wrapperClass: '',
    startIcon: <Download />,
  },
};

export const EndIcon: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children:'Search',
    wrapperClass: '',
    endIcon: <Search />,
  },
};
