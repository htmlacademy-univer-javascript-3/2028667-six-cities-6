import { fireEvent, render, screen } from '@testing-library/react';
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

  it('calls handlers on toggle and option click', () => {
    const handleSortingToggle = vi.fn();
    const handleSortingChange = vi.fn();

    render(
      <SortingOptions
        activeSorting="Popular"
        isOpen
        onSortingToggle={handleSortingToggle}
        onSortingChange={handleSortingChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Popular/i }));
    fireEvent.click(screen.getByText('Price: low to high'));

    expect(handleSortingToggle).toHaveBeenCalledTimes(1);
    expect(handleSortingChange).toHaveBeenCalledWith('Price: low to high');
  });
});
