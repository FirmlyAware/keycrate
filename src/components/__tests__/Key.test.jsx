// src/components/__tests__/Key.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Key from '../Key';

describe('Key Component', () => {
  test('renders children with dark theme classes', () => {
    render(<Key theme="dark">Ctrl</Key>);
    const kbdElement = screen.getByText('Ctrl');
    expect(kbdElement).toBeInTheDocument();
    expect(kbdElement).toHaveClass('px-2 py-1 text-xs font-semibold rounded mx-0.5 bg-gray-600 text-gray-100 border-b-2 border-gray-500');
  });

  test('renders children with light theme classes', () => {
    render(<Key theme="light">Shift</Key>);
    const kbdElement = screen.getByText('Shift');
    expect(kbdElement).toBeInTheDocument();
    expect(kbdElement).toHaveClass('px-2 py-1 text-xs font-semibold rounded mx-0.5 bg-gray-300 text-gray-800 border-b-2 border-gray-400');
  });

  test('renders with unknown theme using dark as default', () => {
    render(<Key theme="unknown">Alt</Key>);
    const kbdElement = screen.getByText('Alt');
    expect(kbdElement).toHaveClass('bg-gray-600 text-gray-100'); // Assuming dark as fallback
  });

  test('renders empty children without error', () => {
    render(<Key theme="dark" />);
    expect(screen.queryByText(/./)).not.toBeInTheDocument(); // No text
  });

  test('snapshot matches for dark theme', () => {
    const { asFragment } = render(<Key theme="dark">Win</Key>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('snapshot matches for light theme', () => {
    const { asFragment } = render(<Key theme="light">Esc</Key>);
    expect(asFragment()).toMatchSnapshot();
  });
});