// src/components/__tests__/WorkflowExample.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkflowExample from '../WorkflowExample';

describe('WorkflowExample Component', () => {
  const example = 'Action: Step1 > Step2 > Step3';

  test('renders title and steps with dark theme', () => {
    render(<WorkflowExample theme="dark" example={example} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Step1')).toHaveClass('text-cyan-400 whitespace-nowrap');
    expect(screen.getByText('Step2')).toBeInTheDocument();
    expect(screen.getByText('Step3')).toBeInTheDocument();
  });

  test('renders title and steps with light theme', () => {
    render(<WorkflowExample theme="light" example={example} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Step1')).toHaveClass('text-cyan-600 whitespace-nowrap');
  });

  test('handles single step', () => {
    render(<WorkflowExample theme="dark" example="Single: Step" />);
    expect(screen.getByText('Single')).toBeInTheDocument();
    expect(screen.getByText('Step')).toBeInTheDocument();
    expect(screen.queryAllByRole('img')).toHaveLength(0); // No arrows
  });

  test('handles empty example', () => {
    render(<WorkflowExample theme="dark" example="" />);
    expect(screen.getByText(':')).toBeInTheDocument(); // Empty title and steps
  });

  test('handles no separator', () => {
    render(<WorkflowExample theme="dark" example="NoColon" />);
    expect(screen.getByText('NoColon')).toBeInTheDocument(); // Treated as title with no steps
  });

  test('snapshot matches for dark theme', () => {
    const { asFragment } = render(<WorkflowExample theme="dark" example={example} />);
    expect(asFragment()).toMatchSnapshot();
  });
});