import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SortingOptions from './sorting-options';

describe('SortingOptions', () => {
  it('renders sorting form with active option and opened list', () => {
    render(
      <SortingOptions
        activeSorting="Top rated first"
        isOpen
        onSortingToggle={vi.fn()}
        onSortingChange={vi.fn()}
      />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Top rated first/i })).toBeInTheDocument();
    expect(screen.getAllByText('Top rated first')[1]).toHaveClass('places__option--active');
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
  });
});
