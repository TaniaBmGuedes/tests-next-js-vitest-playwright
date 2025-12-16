import React from 'react';
import { Button } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const HandMetalIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden
  >
    <path d='M9 4a1 1 0 0 0-2 0v8.5l-1-1.2V6a1 1 0 0 0-2 0v5.6l-.9-1.1a1 1 0 0 0-1.6 1.2l3 4a1 1 0 0 0 .78.38H8V20a2 2 0 0 0 2 2h4.21a2 2 0 0 0 1.87-1.28l1.39-3.72.53-1.34A6 6 0 0 0 18 14V5a1 1 0 0 0-2 0v6h-1V3a1 1 0 0 0-2 0v8h-1V4a1 1 0 0 0-2 0Z' />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden
  >
    <path d='m12 3.5 1.9 4.6 5 .4-3.8 3.3 1.2 4.8L12 14.9l-4.3 1.7 1.2-4.8-3.8-3.3 5-.4L12 3.5Z' />
  </svg>
);

const SmileIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden
  >
    <path d='M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9ZM9 10a1 1 0 1 1-1-1 1 1 0 0 1 1 1Zm6 0a1 1 0 1 1-1-1 1 1 0 0 1 1 1Zm-3 6a5 5 0 0 1-4.33-2.5 1 1 0 1 1 1.73-1A3 3 0 0 0 12 14a3 3 0 0 0 2.6-1.53 1 1 0 1 1 1.74 1A5 5 0 0 1 12 16Z' />
  </svg>
);

const iconOptions = ['none', 'hand', 'star', 'smile'] as const;
type IconKey = (typeof iconOptions)[number];

const iconMap: Record<IconKey, React.ReactNode> = {
  none: null,
  hand: <HandMetalIcon />,
  star: <StarIcon />,
  smile: <SmileIcon />,
};

type ButtonStoryProps = Omit<React.ComponentProps<typeof Button>, 'icon'> & {
  icon?: IconKey;
};

const meta: Meta<ButtonStoryProps> = {
  title: 'compoments/Button',
  component: Button,
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: iconOptions,
      description: 'Optional icon displayed to the left of the text',
    },
    children: {
      control: 'text',
    },
    variant: {
      name: 'Variações',
      options: ['default', 'ghost', 'danger'],
      control: { type: 'select' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    Story => (
      <div className='max-w-5xl mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<ButtonStoryProps>;

const render = ({ icon, children, ...args }: ButtonStoryProps) => {
  const iconKey = icon ?? 'none';
  const iconNode = iconMap[iconKey];

  return (
    <Button {...args} icon={iconNode}>
      {children}
    </Button>
  );
};

export const Default: Story = {
  args: {
    children: 'Button text',
    icon: 'none',
    variant: 'default',
    size: 'md',
  },
  render,
};

export const Playground: Story = {
  args: {
    children: 'Texto do botão',
    icon: 'hand',
  },
  render,
};

export const Large: Story = {
  args: {
    ...Playground.args,
    children: 'Click me',
    icon: 'star',
    size: 'lg',
  },
  render: ({ icon, children, ...args }: ButtonStoryProps) => {
    const iconKey = icon ?? 'none';
    const iconNode = iconMap[iconKey];

    return (
      <div className='flex gap-6 flex-wrap'>
        <Button {...args} className='flex-1' icon={iconNode}>
          {children}
        </Button>

        <Button
          variant='ghost'
          {...args}
          className='flex-1'
          icon={iconMap.hand}
        >
          {children}
        </Button>

        <Button
          variant='danger'
          {...args}
          className='flex-1'
          icon={iconMap.smile}
        >
          {children}
        </Button>

        <Button variant='default' {...args} className='flex-1'>
          Submit
        </Button>
      </div>
    );
  },
};
