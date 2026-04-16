import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Spinner from './spinner';

describe('Spinner', () => {
  it('renders loading indicator', () => {
    render(<Spinner />);

    expect(screen.getByLabelText('Loading offers')).toBeInTheDocument();
  });
});
