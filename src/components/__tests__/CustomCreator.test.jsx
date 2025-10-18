// src/components/__tests__/CustomCreator.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomCreator from '../CustomCreator';

describe('CustomCreator Component', () => {
  const props = {
    theme: 'dark',
    handleAddToToolbox: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders form and submits new shortcut', () => {
    render(<CustomCreator {...props} />);
    fireEvent.change(screen.getByPlaceholderText('Shortcut Name (e.g., Open Project Folder)'), { target: { value: 'Test Shortcut' } });
    fireEvent.change(screen.getByPlaceholderText('Key Combination (e.g., Ctrl + Alt + P)'), { target: { value: 'Ctrl+P' } });
    fireEvent.change(screen.getByPlaceholderText('https://google.com'), { target: { value: 'https://test.com' } });
    fireEvent.submit(screen.getByText('Add Shortcut'));
    expect(screen.getByText('Test Shortcut')).toBeInTheDocument();
  });

  test('shows empty message initially', () => {
    render(<CustomCreator {...props} />);
    expect(screen.getByText("You haven't created any custom shortcuts yet.")).toBeInTheDocument();
  });

  test('prevents submit with empty fields', () => {
    render(<CustomCreator {...props} />);
    fireEvent.submit(screen.getByText('Add Shortcut'));
    expect(screen.queryByText(/Test/)).not.toBeInTheDocument(); // Alert mocked, no add
  });

  test('changes action type and placeholder', () => {
    render(<CustomCreator {...props} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'file' } });
    expect(screen.getByPlaceholderText('C:\\path\\to\\program.exe')).toBeInTheDocument();
  });

  test('loads from localStorage', () => {
    localStorage.setItem('customShortcuts', JSON.stringify([{ id: 'test', name: 'Stored' }]));
    render(<CustomCreator {...props} />);
    expect(screen.getByText('Stored')).toBeInTheDocument();
  });

  test('saves to localStorage on add', () => {
    render(<CustomCreator {...props} />);
    fireEvent.change(screen.getByPlaceholderText('Shortcut Name (e.g., Open Project Folder)'), { target: { value: 'Save Test' } });
    fireEvent.change(screen.getByPlaceholderText('Key Combination (e.g., Ctrl + Alt + P)'), { target: { value: 'Ctrl+S' } });
    fireEvent.change(screen.getByPlaceholderText('https://google.com'), { target: { value: 'https://save.com' } });
    fireEvent.submit(screen.getByText('Add Shortcut'));
    expect(JSON.parse(localStorage.getItem('customShortcuts'))).toHaveLength(1);
  });

  test('snapshot matches', () => {
    const { asFragment } = render(<CustomCreator {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});