import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Airtable Webhook Wizard/i);
  expect(linkElement).toBeInTheDocument();
});
