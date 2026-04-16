import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CitiesList from './cities-list';

describe('CitiesList', () => {
  it('renders all cities and marks active city', () => {
    render(<CitiesList activeCity="Paris" onCityClick={vi.fn()} />);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Paris' })).toHaveClass('tabs__item--active');
  });
});
