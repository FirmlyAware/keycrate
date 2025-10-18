// src/components/__tests__/Modal.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal Component', () => {
  const onClose = jest.fn();
  const children = <div>Test Content</div>;

  test('renders children and closes on overlay click', () => {
    render(<Modal theme="dark" onClose={onClose}>{children}</Modal>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Test Content').parentElement.parentElement); // Click overlay
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not close when clicking inside content', () => {
    render(<Modal theme="light" onClose={onClose}>{children}</Modal>);
    fireEvent.click(screen.getByText('Test Content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  test('renders with dark theme classes', () => {
    render(<Modal theme="dark" onClose={onClose}>{children}</Modal>);
    const content = screen.getByText('Test Content').parentElement;
    expect(content).toHaveClass('bg-gray-800 border-gray-700');
  });

  test('renders with light theme classes', () => {
    render(<Modal theme="light" onClose={onClose}>{children}</Modal>);
    const content = screen.getByText('Test Content').parentElement;
    expect(content).toHaveClass('bg-white border-gray-200');
  });

  test('handles no children', () => {
    render(<Modal theme="dark" onClose={onClose} />);
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  test('snapshot matches', () => {
    const { asFragment } = render(<Modal theme="dark" onClose={onClose}>{children}</Modal>);
    expect(asFragment()).toMatchSnapshot();
  });
});