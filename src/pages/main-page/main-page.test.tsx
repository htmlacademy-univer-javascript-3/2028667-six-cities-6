import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { makeOffer } from '../../store/test-data';
import { renderWithProviders } from '../../test-utils';
import MainPage from './main-page';

const navigateMock = vi.fn();
const updateFavoriteStatusAction = vi.fn((offerId: string, isFavorite: boolean) => ({
  type: 'favorite/update',
  payload: { offerId, isFavorite },
}));

vi.mock('../../components/map/map', () => ({
  default: () => <div>Map</div>,
}));

vi.mock('../../store/api-actions', () => ({
  updateFavoriteStatusAction: (...args: [string, boolean]) => updateFavoriteStatusAction(...args),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('MainPage', () => {
  it('renders empty state when selected city has no offers', () => {
    renderWithProviders(<MainPage />, {
      preloadedState: {
        app: {
          city: 'Paris',
        },
        catalog: {
          offers: [makeOffer({ city: 'Amsterdam' })],
          isOffersLoading: false,
        },
      },
    });

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('changes auth state on sign out click', async () => {
    renderWithProviders(<MainPage />, {
      preloadedState: {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
        catalog: {
          offers: [makeOffer({ city: 'Paris' })],
          isOffersLoading: false,
        },
      },
    });

    fireEvent.click(screen.getByText('Sign out'));

    await waitFor(() => {
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });
  });

  it('redirects unauthorized user to login on favorite click', () => {
    renderWithProviders(<MainPage />, {
      preloadedState: {
        catalog: {
          offers: [makeOffer({ id: '1', city: 'Paris', title: 'Paris offer' })],
          isOffersLoading: false,
        },
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add to bookmarks/i }));

    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('dispatches favorite update for authorized user', async () => {
    renderWithProviders(<MainPage />, {
      preloadedState: {
        user: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
        catalog: {
          offers: [makeOffer({ id: '1', city: 'Paris', title: 'Paris offer', isFavorite: false })],
          isOffersLoading: false,
        },
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add to bookmarks/i }));

    await waitFor(() => {
      expect(updateFavoriteStatusAction).toHaveBeenCalledWith('1', false);
    });
  });
});
