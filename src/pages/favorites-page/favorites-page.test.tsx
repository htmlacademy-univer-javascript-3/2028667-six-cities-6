import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { makeOffer } from '../../store/test-data';
import { renderWithProviders } from '../../test-utils';
import FavoritesPage from './favorites-page';

const updateFavoriteStatusAction = vi.fn((offerId: string, isFavorite: boolean) => ({
  type: 'favorite/update',
  payload: { offerId, isFavorite },
}));
const fetchFavoriteOffersAction = vi.fn(() => ({
  type: 'favorite/fetch',
}));

vi.mock('../../store/api-actions', () => ({
  fetchFavoriteOffersAction: () => fetchFavoriteOffersAction(),
  updateFavoriteStatusAction: (...args: [string, boolean]) => updateFavoriteStatusAction(...args),
}));

describe('FavoritesPage', () => {
  it('renders grouped favorite offers', () => {
    renderWithProviders(<FavoritesPage />, {
      preloadedState: {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: {
            id: 1,
            email: 'user@mail.com',
            name: 'User',
            avatarUrl: 'img/avatar.jpg',
            isPro: false,
            token: 'token',
          },
        },
        catalog: {
          favoriteOffers: [
            makeOffer({ id: '1', city: 'Paris', isFavorite: true, title: 'Paris offer' }),
            makeOffer({ id: '2', city: 'Amsterdam', isFavorite: true, title: 'Amsterdam offer' }),
          ],
        },
      },
    });

    expect(fetchFavoriteOffersAction).toHaveBeenCalled();
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Paris offer')).toBeInTheDocument();
  });

  it('dispatches favorite update when bookmark button is clicked', async () => {
    renderWithProviders(<FavoritesPage />, {
      preloadedState: {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: {
            id: 1,
            email: 'user@mail.com',
            name: 'User',
            avatarUrl: 'img/avatar.jpg',
            isPro: false,
            token: 'token',
          },
        },
        catalog: {
          favoriteOffers: [makeOffer({ id: '1', city: 'Paris', isFavorite: true, title: 'Paris offer' })],
        },
      },
    });

    fireEvent.click(screen.getByRole('button', { name: 'In bookmarks' }));

    await waitFor(() => {
      expect(updateFavoriteStatusAction).toHaveBeenCalledWith('1', true);
    });
  });
});
