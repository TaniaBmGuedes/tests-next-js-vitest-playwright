import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

const VARIANT_DEFAULT_CLASSES = 'bg-blue-600 hover:bg-blue-700 text-blue-100';
const VARIANT_DANGER_CLASSES = 'bg-red-600 hover:bg-red-700 text-red-100';
const VARIANT_GHOST_CLASSES = 'bg-slate-300 hover:bg-slate-400 text-slate-950';

const SIZE_MD_CLASSES =
  'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2';
const SIZE_SM_CLASSES =
  'text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1';
const SIZE_LG_CLASSES =
  'text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3';
const DISABLED_CLASSES =
  'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed';

describe('<Button />', () => {
  describe('default props and JSX', () => {
    test('renders the button with default props (only children)', async () => {
      render(<Button>Submit form</Button>);

      const button = screen.getByRole('button', {
        name: /submit form/i,
      });

      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
      expect(button).toHaveClass(SIZE_MD_CLASSES);
    });

    test('checks if the default JSX props work correctly', async () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} type='submit' aria-hidden='false'>
          Submit form
        </Button>,
      );

      const button = screen.getByText('Submit form');

      await userEvent.click(button);
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(2);
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-hidden', 'false');
    });

    test('renders an optional icon when provided', async () => {
      render(
        <Button icon={<svg data-testid='icon' />} aria-label='save'>
          Save
        </Button>,
      );

      const icon = screen.getByTestId('icon');
      const button = screen.getByLabelText(/save/i);

      expect(icon).toBeInTheDocument();
      expect(button).toContainElement(icon);
    });
  });

  describe('variants (colors)', () => {
    test('checks default applies the correct color', async () => {
      render(
        <Button variant='default' title='o botão'>
          Submit form
        </Button>,
      );

      const button = screen.getByTitle(/o botão/i);
      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
    });

    test('checks danger applies the correct color', async () => {
      render(
        <Button variant='danger' title='o botão'>
          Submit form
        </Button>,
      );

      const button = screen.getByTitle(/o botão/i);
      expect(button).toHaveClass(VARIANT_DANGER_CLASSES);
    });

    test('checks ghost applies the correct color', async () => {
      render(
        <Button variant='ghost' title='o botão'>
          Submit form
        </Button>,
      );

      const button = screen.getByTitle(/o botão/i);
      expect(button).toHaveClass(VARIANT_GHOST_CLASSES);
    });
  });

  describe('size', () => {
    test('size sm should be smaller', async () => {
      render(
        <Button size='sm' data-testid='qualquer-coisa'>
          Submit form
        </Button>,
      );

      const button = screen.getByTestId(/qualquer-coisa/i);
      expect(button).toHaveClass(SIZE_SM_CLASSES);
    });

    test('size md should be medium', async () => {
      render(
        <Button size='md' data-testid='qualquer-coisa'>
          Submit form
        </Button>,
      );

      const button = screen.getByTestId(/qualquer-coisa/i);
      expect(button).toHaveClass(SIZE_MD_CLASSES);
    });

    test('size lg should be large', async () => {
      const { container } = render(
        <Button size='lg' id='o-id'>
          Submit form
        </Button>,
      );

      const button = container.querySelector('#o-id');

      expect(button).toHaveClass(SIZE_LG_CLASSES);
    });
  });

  describe('disabled', () => {
    test('disabled state classes are correct', async () => {
      render(<Button disabled>Submit form</Button>);

      const button = screen.getByRole('button', { name: /submit form/i });

      expect(button).toHaveClass(DISABLED_CLASSES);
      expect(button).toBeDisabled();
    });
  });
});
