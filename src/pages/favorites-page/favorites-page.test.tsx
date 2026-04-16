import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { makeOffer } from '../../store/test-data';
import { renderWithProviders } from '../../test-utils';
import FavoritesPage from './favorites-page';

const updateFavoriteStatusAction = vi.fn((offerId: string, isFavorite: boolean) => ({
  type: 'favorite/update',
  payload: { offerId, isFavorite },
}));

vi.mock('../../store/api-actions', () => ({
  updateFavoriteStatusAction: (...args: [string, boolean]) => updateFavoriteStatusAction(...args),
}));

describe('FavoritesPage', () => {
  it('renders grouped favorite offers', () => {
    renderWithProviders(<FavoritesPage />, {
      preloadedState: {
        catalog: {
          offers: [
            makeOffer({ id: '1', city: 'Paris', isFavorite: true, title: 'Paris offer' }),
            makeOffer({ id: '2', city: 'Amsterdam', isFavorite: true, title: 'Amsterdam offer' }),
          ],
          isOffersLoading: false,
        },
      },
    });

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Paris offer')).toBeInTheDocument();
  });

  it('dispatches favorite update when bookmark button is clicked', async () => {
    renderWithProviders(<FavoritesPage />, {
      preloadedState: {
        catalog: {
          offers: [makeOffer({ id: '1', city: 'Paris', isFavorite: true, title: 'Paris offer' })],
          isOffersLoading: false,
        },
      },
    });

    fireEvent.click(screen.getByRole('button', { name: 'In bookmarks' }));

    await waitFor(() => {
      expect(updateFavoriteStatusAction).toHaveBeenCalledWith('1', true);
    });
  });
});
