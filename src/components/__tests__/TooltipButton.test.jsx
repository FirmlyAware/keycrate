// src/components/__tests__/TooltipButton.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TooltipButton from '../TooltipButton';

describe('TooltipButton Component', () => {
  test('renders children and applies className', () => {
    render(<TooltipButton title="Test Title" className="test-class">Click Me</TooltipButton>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('p-1 rounded test-class');
    expect(button).toHaveAttribute('title', 'Test Title');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<TooltipButton onClick={handleClick} title="Test">Button</TooltipButton>);
    const button = screen.getByText('Button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders without onClick prop', () => {
    render(<TooltipButton title="No Click">Safe</TooltipButton>);
    const button = screen.getByText('Safe');
    fireEvent.click(button); // No error
    expect(button).toBeInTheDocument();
  });

  test('renders without title', () => {
    render(<TooltipButton>Untitled</TooltipButton>);
    const button = screen.getByText('Untitled');
    expect(button).not.toHaveAttribute('title');
  });

  test('applies additional classes', () => {
    render(<TooltipButton className="extra-class">Classy</TooltipButton>);
    const button = screen.getByText('Classy');
    expect(button).toHaveClass('extra-class');
  });

  test('snapshot matches', () => {
    const { asFragment } = render(<TooltipButton title="Snap">Test</TooltipButton>);
    expect(asFragment()).toMatchSnapshot();
  });
});