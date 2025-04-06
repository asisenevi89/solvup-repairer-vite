import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../../Components/UI';

const meta = {
  title: 'UI Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component - complete prop list available at https://mui.com/material-ui/api/avatar/#props'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'Avatar Path' },
    variant: {
      control: 'select',
      options: ["circular", "rounded", "square"],
      description: 'Type of Avatar',
    },
    children: { control: 'text', description: 'Avatar Content' },
    wrapperClass: { control: 'text',  description: 'Class for custom styling' },
    alt: { control: 'text', description: 'Avatar Alt' },
  },
  args: {
    variant: 'circular',
    wrapperClass: '',
    src: "https://as2.ftcdn.net/v2/jpg/08/08/37/31/1000_F_808373133_lrCrFLLTXF0A2WQK7QKMCNAzKCjX7kvb.webp"
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    variant: 'circular',
    src: 'https://as2.ftcdn.net/v2/jpg/08/08/37/31/1000_F_808373133_lrCrFLLTXF0A2WQK7QKMCNAzKCjX7kvb.webp',
    alt: 'Avatar Image',
    sx:{ width: '100px', height: '100px'}
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    src: 'https://as2.ftcdn.net/v2/jpg/08/08/37/31/1000_F_808373133_lrCrFLLTXF0A2WQK7QKMCNAzKCjX7kvb.webp',
    alt: 'Avatar Image',
    sx:{ width: '100px', height: '100px', border: '1px solid'}
  },
};

export const Letters: Story = {
  args: {
    variant: 'circular',
    children: 'AN',
    src: '',
    alt: 'Avatar Image',
    sx:{ width: '100px', height: '100px' }
  },
};
