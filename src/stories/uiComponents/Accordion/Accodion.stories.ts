import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../../Components/UI';

const meta = {
  title: 'UI Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accordion component - complete prop list available at https://mui.com/material-ui/api/accordion/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: [], description: 'Accordion Item List' },
    wrapperClass: { control: 'text', description: 'Custom Class' },
  },
  args: {
    items: [
      {summary: 'Accordion1', details: 'Accordion 1 Description', children:'' },
      {summary: 'Accordion1', details: 'Accordion 1 Description', children: '' },
    ],
    wrapperClass: '',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    items: [
      {summary: 'Accordion1', details: 'Accordion 1 Description', children:'' },
      {summary: 'Accordion1', details: 'Accordion 1 Description', children: '' },
    ],
    wrapperClass: '',
  },
};
