// src/components/__tests__/HomeDashboard.test.jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HomeDashboard from '../HomeDashboard';

describe('HomeDashboard Component', () => {
  const props = {
    theme: 'dark',
    setActiveCategory: jest.fn(),
  };

  test('renders dashboard sections', () => {
    render(<HomeDashboard {...props} />);
    expect(screen.getByText('Home Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Update Available!')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Shortcut of the Day')).toBeInTheDocument();
  });

  test('cycles through news items', () => {
    jest.useFakeTimers();
    render(<HomeDashboard {...props} />);
    expect(screen.getByText(/Tech Today/)).toBeInTheDocument(); // First news
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText(/Productivity Hacks/)).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('clicks quick link', () => {
    render(<HomeDashboard {...props} />);
    fireEvent.click(screen.getByText('Shortcut Bible'));
    expect(props.setActiveCategory).toHaveBeenCalledWith('Shortcut Bible');
  });

  test('renders with light theme', () => {
    render(<HomeDashboard {...props} theme="light" />);
    const updateDiv = screen.getByText('Update Available!').parentElement;
    expect(updateDiv).toHaveClass('bg-blue-100');
  });

  test('snapshot matches', () => {
    const { asFragment } = render(<HomeDashboard {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});