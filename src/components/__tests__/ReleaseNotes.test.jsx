// src/components/__tests__/ReleaseNotes.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ReleaseNotes from '../ReleaseNotes';

describe('ReleaseNotes Component', () => {
  test('renders release notes', () => {
    render(<ReleaseNotes theme="dark" />);
    expect(screen.getByText("What's New in KeyCrate")).toBeInTheDocument();
    expect(screen.getByText('Version 1.1 (Major Update)')).toBeInTheDocument();
    expect(screen.getByText('Version 1.0.0 (Initial Release)')).toBeInTheDocument();
  });

  test('renders all versions', () => {
    render(<ReleaseNotes theme="light" />);
    expect(screen.getByText(/Interactive Workflow Sandbox/)).toBeInTheDocument();
    expect(screen.getByText(/Added "Windows Tools" section/)).toBeInTheDocument();
    expect(screen.getByText(/Initial public release/)).toBeInTheDocument();
  });

  test('theme does not affect content', () => {
    render(<ReleaseNotes theme="dark" />);
    const header = screen.getByText('Version 1.1 (Major Update)');
    expect(header).toHaveClass('text-green-500');
  });

  test('snapshot matches', () => {
    const { asFragment } = render(<ReleaseNotes theme="dark" />);
    expect(asFragment()).toMatchSnapshot();
  });
});