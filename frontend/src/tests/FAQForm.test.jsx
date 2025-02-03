import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQForm from '../components/FAQForm';

test('renders FAQForm and submits data', () => {
  const handleSubmit = jest.fn();
  render(<FAQForm onSubmit={handleSubmit} />);

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText('Enter your question'), {
    target: { value: 'What is React?' },
  });
  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'React is a JavaScript library.' },
  });

  // Submit the form
  fireEvent.click(screen.getByText('Add FAQ'));

  // Check if the onSubmit function was called
  expect(handleSubmit).toHaveBeenCalledWith({
    question_en: 'What is React?',
    answer_en: 'React is a JavaScript library.',
  });
});