import Authentication from '../pages/authentication';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Authentications', () => {
  it('renders auth page', () => {
    render(<Authentication />);
    // check if all components are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('forms')).toBeInTheDocument();
  });
});
