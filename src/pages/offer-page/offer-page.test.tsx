import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { makeOffer, makeReview } from '../../store/test-data';
import { renderWithProviders } from '../../test-utils';
import OfferPage from './offer-page';

const navigateMock = vi.fn();
const fetchOfferPageDataAction = vi.fn((offerId: string) => ({ type: 'offer/fetch', payload: offerId }));
const updateFavoriteStatusAction = vi.fn((offerId: string, isFavorite: boolean) => ({
  type: 'favorite/update',
  payload: { offerId, isFavorite },
}));

vi.mock('../../components/map/map', () => ({
  default: () => <div>Map</div>,
}));

vi.mock('../../components/offers-list/offers-list', () => ({
  default: () => <div>Offers list</div>,
}));

vi.mock('../../components/review-form/review-form', () => ({
  default: () => <div>Review form</div>,
}));

vi.mock('../../components/reviews-list/reviews-list', () => ({
  default: () => <div>Reviews list</div>,
}));

vi.mock('../../store/api-actions', () => ({
  fetchOfferPageDataAction: (...args: [string]) => fetchOfferPageDataAction(...args),
  updateFavoriteStatusAction: (...args: [string, boolean]) => updateFavoriteStatusAction(...args),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('OfferPage', () => {
  it('renders spinner while offer is loading', () => {
    renderWithProviders(
      <Routes>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>,
      {
        route: '/offer/1',
        preloadedState: {
          offerPage: {
            nearbyOffers: [],
            currentOffer: null,
            reviews: [],
            isOfferLoading: true,
            isReviewSubmitting: false,
          },
        },
      }
    );

    expect(screen.getByLabelText('Loading offers')).toBeInTheDocument();
  });

  it('redirects to 404 when offer is absent', () => {
    renderWithProviders(
      <Routes>
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="/404" element={<div>Not found page</div>} />
      </Routes>,
      {
        route: '/offer/1',
        preloadedState: {
          offerPage: {
            nearbyOffers: [],
            currentOffer: null,
            reviews: [],
            isOfferLoading: false,
            isReviewSubmitting: false,
          },
        },
      }
    );

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });

  it('dispatches fetch action on mount and renders offer details', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>,
      {
        route: '/offer/1',
        preloadedState: {
          user: {
            authorizationStatus: AuthorizationStatus.Auth,
          },
          catalog: {
            offers: [makeOffer({ id: '1', isFavorite: true })],
            isOffersLoading: false,
          },
          offerPage: {
            nearbyOffers: [makeOffer({ id: '2' })],
            currentOffer: makeOffer({ id: '1', title: 'Current offer', isFavorite: true }),
            reviews: [makeReview()],
            isOfferLoading: false,
            isReviewSubmitting: false,
          },
        },
      }
    );

    await waitFor(() => {
      expect(fetchOfferPageDataAction).toHaveBeenCalledWith('1');
    });

    expect(screen.getByText('Current offer')).toBeInTheDocument();
    expect(screen.getByText('Review form')).toBeInTheDocument();
  });

  it('redirects unauthorized user to login on favorite click', () => {
    renderWithProviders(
      <Routes>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>,
      {
        route: '/offer/1',
        preloadedState: {
          catalog: {
            offers: [makeOffer({ id: '1' })],
            isOffersLoading: false,
          },
          offerPage: {
            nearbyOffers: [makeOffer({ id: '2' })],
            currentOffer: makeOffer({ id: '1', title: 'Current offer' }),
            reviews: [],
            isOfferLoading: false,
            isReviewSubmitting: false,
          },
        },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /Add to bookmarks/i }));

    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('dispatches favorite update for authorized user', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>,
      {
        route: '/offer/1',
        preloadedState: {
          user: {
            authorizationStatus: AuthorizationStatus.Auth,
          },
          catalog: {
            offers: [makeOffer({ id: '1', isFavorite: false })],
            isOffersLoading: false,
          },
          offerPage: {
            nearbyOffers: [makeOffer({ id: '2' })],
            currentOffer: makeOffer({ id: '1', title: 'Current offer', isFavorite: false }),
            reviews: [],
            isOfferLoading: false,
            isReviewSubmitting: false,
          },
        },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /Add to bookmarks/i }));

    await waitFor(() => {
      expect(updateFavoriteStatusAction).toHaveBeenCalledWith('1', false);
    });
  });
});
