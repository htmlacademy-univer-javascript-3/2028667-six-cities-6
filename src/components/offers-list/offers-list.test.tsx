import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { makeOffer } from '../../store/test-data';
import OffersList from './offers-list';

describe('OffersList', () => {
  it('renders all offer cards', () => {
    const offers = [
      makeOffer({ id: '1', title: 'First offer' }),
      makeOffer({ id: '2', title: 'Second offer' }),
    ];

    const { container } = render(
      <MemoryRouter>
        <OffersList offers={offers} onToggleFavorite={vi.fn()} onOfferHover={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('First offer')).toBeInTheDocument();
    expect(screen.getByText('Second offer')).toBeInTheDocument();
    expect(container.querySelectorAll('.place-card')).toHaveLength(2);
  });
});
