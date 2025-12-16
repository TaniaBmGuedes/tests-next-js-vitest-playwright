import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '.';

const user = userEvent.setup();

describe('<TodoForm /> (integration)', () => {
  test('renders all form components', async () => {
    const { btn, input } = renderForm();
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('calls the action with the correct values', async () => {
    const { btn, input, action } = renderForm();
    await user.type(input, 'task');
    await user.click(btn);
    expect(action).toHaveBeenCalledExactlyOnceWith('task');
  });

  test('trims leading and trailing spaces from the description', async () => {
    const { btn, input, action } = renderForm();
    await user.type(input, '   task    ');
    await user.click(btn);
    expect(action).toHaveBeenCalledExactlyOnceWith('task');
  });

  test('clears the input when the form succeeds', async () => {
    const { btn, input } = renderForm();
    await user.type(input, '   task    ');
    await user.click(btn);
    expect(input).toHaveValue('');
  });

  test('disables the button while sending the action', async () => {
    const { btn, input } = renderForm({ delay: 5 });
    await user.type(input, 'task');
    await user.click(btn);

    await waitFor(() => expect(btn).toBeDisabled());
    await waitFor(() => expect(btn).toBeEnabled());
  });

  test('disables the input while sending the action', async () => {
    const { btn, input } = renderForm({ delay: 5 });
    await user.type(input, 'task');
    await user.click(btn);

    await waitFor(() => expect(input).toBeDisabled());
    await waitFor(() => expect(input).toBeEnabled());
  });

  test('switches button text while sending the action', async () => {
    const { btn, input } = renderForm({ delay: 5 });
    await user.type(input, 'task');
    await user.click(btn);

    await waitFor(() => expect(btn).toHaveAccessibleName('Creating task...'));
    await waitFor(() => expect(btn).toHaveAccessibleName('Create task'));
  });

  test('shows the error when the action returns an error', async () => {
    const { btn, input } = renderForm({ success: false });
    await user.type(input, 'task');
    await user.click(btn);

    const error = await screen.findByRole('alert');

    expect(error).toHaveTextContent('failed to create todo');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  test('keeps the input value when the action returns an error', async () => {
    const { btn, input } = renderForm({ success: false });
    await user.type(input, 'task');
    await user.click(btn);

    expect(input).toHaveValue('task');
  });
});

type RenderForm = {
  delay?: number;
  success?: boolean;
};

function renderForm({ delay = 0, success = true }: RenderForm = {}) {
  const actionSuccessResult = {
    success: true,
    todo: { id: 'id', description: 'description', createdAt: 'createdAt' },
  };
  const actionErrorResult = {
    success: false,
    errors: ['failed to create todo'],
  };
  const actionResult = success ? actionSuccessResult : actionErrorResult;

  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise(r => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  render(<TodoForm action={action} />);

  const input = screen.getByLabelText('Task');
  const btn = screen.getByRole('button');

  return { btn, input, action };
}
