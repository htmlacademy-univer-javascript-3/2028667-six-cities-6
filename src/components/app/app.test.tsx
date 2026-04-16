import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { AuthorizationStatus } from '../../const';
import type { AuthorizationStatus as AuthorizationStatusType } from '../../const';
import { reducer } from '../../store/reducer';
import App from './app';

vi.mock('../../pages/main-page/main-page', () => ({
  default: () => <div>Main page</div>,
}));

vi.mock('../../pages/login-page/login-page', () => ({
  default: () => <div>Login page</div>,
}));

vi.mock('../../pages/favorites-page/favorites-page', () => ({
  default: () => <div>Favorites page</div>,
}));

vi.mock('../../pages/offer-page/offer-page', () => ({
  default: () => <div>Offer page</div>,
}));

vi.mock('../../pages/not-found-page/not-found-page', () => ({
  default: () => <div>Not found page</div>,
}));

vi.mock('../spinner/spinner', () => ({
  default: () => <div>Loading spinner</div>,
}));

vi.mock('../../store/api-actions', () => ({
  fetchOffersAction: () => async () => Promise.resolve(),
  checkAuthAction: () => async () => Promise.resolve(),
}));

function makeStore(
  authorizationStatus: AuthorizationStatusType = AuthorizationStatus.NoAuth,
  isOffersLoading = false
) {
  return configureStore({
    reducer,
    preloadedState: {
      app: {
        city: 'Paris',
      },
      user: {
        authorizationStatus,
      },
      catalog: {
        offers: [],
        isOffersLoading,
      },
      offerPage: {
        nearbyOffers: [],
        currentOffer: null,
        reviews: [],
        isOfferLoading: false,
        isReviewSubmitting: false,
      },
    },
  });
}

function renderApp(
  route: string,
  authorizationStatus: AuthorizationStatusType = AuthorizationStatus.NoAuth,
  isOffersLoading = false
) {
  const store = makeStore(authorizationStatus, isOffersLoading);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

describe('App routing', () => {
  it('renders spinner while offers are loading', () => {
    renderApp('/', AuthorizationStatus.NoAuth, true);

    expect(screen.getByText('Loading spinner')).toBeInTheDocument();
  });

  it('renders main page for root route', () => {
    renderApp('/');

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('renders login page for /login route', () => {
    renderApp('/login');

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('renders favorites page for authorized user', () => {
    renderApp('/favorites', AuthorizationStatus.Auth);

    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });

  it('redirects unauthorized user from /favorites to /login', () => {
    renderApp('/favorites', AuthorizationStatus.NoAuth);

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('renders offer page for /offer/:id route', () => {
    renderApp('/offer/1');

    expect(screen.getByText('Offer page')).toBeInTheDocument();
  });

  it('renders not found page for unknown route', () => {
    renderApp('/unknown-route');

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
