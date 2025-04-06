import type { Meta, StoryObj } from '@storybook/react';
import { AppBar, Typography } from '../../../Components/UI';
import './styles.scss';

const home = <Typography variant='h6' marginRight="20px" marginLeft="20px">Home</Typography>
const about = <Typography variant='h6'>About</Typography>

const meta = {
  title: 'UI Components/AppBar',
  component: AppBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'AppBar component - complete prop list available at https://mui.com/material-ui/api/app-bar/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: [], description: 'App Bar Items' },
    wrapperClass: { control: 'text', description: 'Custom Class' },
    containerProps: {
      control: 'object',
      description: 'AppBar outer container properties. https://mui.com/material-ui/api/container/#props'
    },
    toolbarProps: {
      control: 'object',
      description: 'AppBar toolbar properties https://mui.com/material-ui/api/container/#props'
    },
  },
  args: {
    children: [home, about],
    wrapperClass: 'app-bar-parent ',
    containerProps: {
      maxWidth: 'xl',
      fixed: true,
      disableGutters:  true,
    },
    toolbarProps: {
      variant: 'regular',
      sx: { width: '100%' }
    },
  },
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    children: [home, about],
    wrapperClass: 'app-bar-parent',
  },
};
