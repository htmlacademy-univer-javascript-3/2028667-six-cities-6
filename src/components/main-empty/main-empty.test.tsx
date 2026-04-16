import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MainEmpty from './main-empty';

describe('MainEmpty', () => {
  it('renders empty state message for selected city', () => {
    render(<MainEmpty cityName="Amsterdam" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Amsterdam')).toBeInTheDocument();
  });
});
