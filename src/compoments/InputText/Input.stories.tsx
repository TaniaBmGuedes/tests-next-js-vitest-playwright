import { InputText } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputText> = {
  title: 'Components/Forms/InputText',
  component: InputText,
  decorators: [
    Story => (
      <div className='max-w-screen-lg mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'url', 'search'],
      description: 'Input HTML type',
    },
    labelText: {
      control: 'text',
      description: 'Input label text',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown to the user',
    },
    placeholder: {
      control: 'text',
      description: 'Usage hint shown as placeholder',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Field is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only field',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    type: 'text',
    labelText: 'Input Label',
    errorMessage: '',
    placeholder: 'Type something...',
    required: true,
    disabled: false,
    readOnly: false,
    defaultValue: 'This is the input default value',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'This is an error message',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};
