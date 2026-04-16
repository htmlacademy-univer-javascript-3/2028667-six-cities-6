import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MainEmptyPage from './main-empty-page';

describe('MainEmptyPage', () => {
  it('renders main empty page message', () => {
    render(<MainEmptyPage />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Dusseldorf')).toBeInTheDocument();
  });
});
