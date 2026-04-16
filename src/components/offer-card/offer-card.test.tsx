import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { makeOffer } from '../../store/test-data';
import OfferCard from './offer-card';

describe('OfferCard', () => {
  it('renders offer data and active favorite state', () => {
    const offer = makeOffer({
      id: '42',
      title: 'Beautiful apartment',
      isPremium: true,
      isFavorite: true,
      price: 250,
    });

    render(
      <MemoryRouter>
        <OfferCard offer={offer} onToggleFavorite={vi.fn()} onOfferHover={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText(/€250/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remove from bookmarks/i })).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getAllByRole('link', { name: /Beautiful apartment/i })[0]).toHaveAttribute('href', '/offer/42');
  });

  it('calls handlers for favorite button and hover events', () => {
    const offer = makeOffer({ id: '42', title: 'Beautiful apartment' });
    const handleToggleFavorite = vi.fn();
    const handleOfferHover = vi.fn();

    render(
      <MemoryRouter>
        <OfferCard offer={offer} onToggleFavorite={handleToggleFavorite} onOfferHover={handleOfferHover} />
      </MemoryRouter>
    );

    fireEvent.mouseEnter(screen.getByText('Beautiful apartment').closest('article') as HTMLElement);
    fireEvent.mouseLeave(screen.getByText('Beautiful apartment').closest('article') as HTMLElement);
    fireEvent.click(screen.getByRole('button', { name: /Add to bookmarks/i }));

    expect(handleOfferHover).toHaveBeenNthCalledWith(1, '42');
    expect(handleOfferHover).toHaveBeenNthCalledWith(2, null);
    expect(handleToggleFavorite).toHaveBeenCalledWith('42');
  });
});
