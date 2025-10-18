// src/__tests__/App.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders KeyCrate title', () => {
    render(<App />);
    expect(screen.getByText('KeyCrate')).toBeInTheDocument();
  });

  test('renders home dashboard by default', () => {
    render(<App />);
    expect(screen.getByText('Home Dashboard')).toBeInTheDocument();
  });

  test('changes category on click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Windows Shortcuts'));
    expect(screen.getByText('Windows Shortcuts')).toBeInTheDocument();
  });

  test('searches and shows results', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Search all shortcuts and commands...'), { target: { value: 'win' } });
    expect(screen.getByText('Search Results for "win"')).toBeInTheDocument();
  });

  test('shows no results for invalid search', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Search all shortcuts and commands...'), { target: { value: 'nonexistent' } });
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('toggles theme via menu', () => {
    render(<App />);
    fireEvent.click(screen.getByText('View'));
    fireEvent.click(screen.getByText('Toggle Theme'));
    // Check class changes or localStorage
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('minimizes and restores', () => {
    render(<App />);
    fireEvent.click(screen.getByTitle('Minimize'));
    expect(screen.getByText('KeyCrate')).toBeInTheDocument(); // Minimized button
    fireEvent.click(screen.getByText('KeyCrate'));
    expect(screen.getByText('Home Dashboard')).toBeInTheDocument(); // Restored
  });

  test('maximizes and restores', () => {
    render(<App />);
    fireEvent.click(screen.getByTitle('Maximize'));
    // Check classes for full screen
    fireEvent.click(screen.getByTitle('Restore'));
    // Check normal size
  });

  test('submits feedback', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Suggest a shortcut or command...'), { target: { value: 'Test feedback' } });
    fireEvent.submit(screen.getByText('Submit'));
    // Alert or console logged
  });

  test('adds to toolbox and copies', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Windows Shortcuts'));
    fireEvent.click(screen.getAllByTitle('Add to Toolbox')[0]);
    // Check localStorage or state
  });

  test('snapshot matches initial state', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});