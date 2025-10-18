// src/components/__tests__/MenuBar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuBar from '../MenuBar';

describe('MenuBar Component', () => {
  const props = {
    theme: 'dark',
    setTheme: jest.fn(),
    setIsToolboxOpen: jest.fn(),
    setToolboxItems: jest.fn(),
    setActiveCategory: jest.fn(),
    setShowAboutModal: jest.fn(),
    checkForUpdates: jest.fn(),
  };

  test('renders menu items', () => {
    render(<MenuBar {...props} />);
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  test('opens and closes menu on click', () => {
    render(<MenuBar {...props} />);
    fireEvent.click(screen.getByText('File'));
    expect(screen.getByText('Import My Shortcuts & Toolbox...')).toBeInTheDocument();
    fireEvent.click(screen.getByText('File')); // Close
    expect(screen.queryByText('Import My Shortcuts & Toolbox...')).not.toBeInTheDocument();
  });

  test('calls action on menu item click', () => {
    render(<MenuBar {...props} />);
    fireEvent.click(screen.getByText('View'));
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(props.setTheme).toHaveBeenCalledWith('light'); // Assuming current is dark
  });

  test('closes menu on outside click', () => {
    render(<MenuBar {...props} />);
    fireEvent.click(screen.getByText('Help'));
    expect(screen.getByText('About KeyCrate')).toBeInTheDocument();
    fireEvent.mouseDown(document.body); // Simulate outside click
    expect(screen.queryByText('About KeyCrate')).not.toBeInTheDocument();
  });

  test('handles print action', () => {
    const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});
    render(<MenuBar {...props} />);
    fireEvent.click(screen.getByText('File'));
    fireEvent.click(screen.getByText('Print Current View'));
    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  test('snapshot matches', () => {
    const { asFragment } = render(<MenuBar {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});