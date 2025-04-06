import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete, TextField } from '../../../Components/UI';
import sampleData from './SampleData';

const meta = {
  title: 'UI Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Autocomplete component - complete prop list available at https://mui.com/material-ui/api/autocomplete/#props'
      },
    },
  },
  tags: ['autodocs'],
  args: {
    disablePortal: true,
    options: sampleData.map(item => item.label),
    renderInput: (params) => <TextField sx={{ width: '400px' }} {...params} label="Search List" />
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  args: {
    autoHighlight: true,
  },
};

export const AlwaysShowList: Story = {
  args: {
    open: true,
  },
};
