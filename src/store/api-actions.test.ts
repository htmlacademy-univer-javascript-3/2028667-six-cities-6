import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import {
  fillCurrentOffer,
  fillFavoriteOffers,
  fillNearbyOffers,
  fillOffers,
  fillReviews,
  requireAuthorization,
  setError,
  setOfferLoading,
  setOffersLoading,
  setReviewError,
  setReviewSubmitting,
  setUserInfo,
  updateFavoriteOffer,
} from './action';
import {
  checkAuthAction,
  fetchOfferPageDataAction,
  fetchOffersAction,
  postReviewAction,
  updateFavoriteStatusAction,
} from './api-actions';
import { reducer } from './reducer';
import { makeServerOffer, makeServerReview } from './test-data';
import { adaptServerOfferToClientOffer } from '../types/server-offer';
import { adaptServerReviewToClientReview } from '../types/server-review';

const api = createAPI(() => undefined);
const initialState = reducer(undefined, { type: 'UNKNOWN_ACTION' } as never);

describe('async actions', () => {
  let mockApi: MockAdapter;
  let dispatch: ReturnType<typeof vi.fn>;

  const getDispatchedActions = (): unknown[] => {
    const calls = dispatch.mock.calls as Array<[unknown]>;

    return calls
      .map(([action]) => action)
      .filter((action) => typeof action !== 'function');
  };

  beforeEach(() => {
    mockApi = new MockAdapter(api);
    dispatch = vi.fn((action: unknown): unknown => {
      if (typeof action === 'function') {
        return action(dispatch, () => initialState, api);
      }

      return action;
    });
  });

  afterEach(() => {
    mockApi.restore();
  });

  it('fetchOffersAction dispatches offers loading lifecycle', async () => {
    const serverOffers = [
      makeServerOffer(),
      makeServerOffer({
        id: '2',
        city: {
          name: 'Amsterdam',
          location: { latitude: 52.37454, longitude: 4.897976, zoom: 12 },
        },
      }),
    ];
    mockApi.onGet('/offers').reply(200, serverOffers);

    await fetchOffersAction()(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      setOffersLoading(true),
      fillOffers(serverOffers.map(adaptServerOfferToClientOffer)),
      setError(null),
      setOffersLoading(false),
    ]);
  });

  it('checkAuthAction dispatches authorized status on success', async () => {
    const authInfo = {
      id: 1,
      email: 'test@mail.com',
      name: 'User',
      avatarUrl: 'img/avatar.jpg',
      isPro: false,
      token: 'token',
    };
    const serverFavoriteOffers = [makeServerOffer({ isFavorite: true })];
    mockApi.onGet('/login').reply(200, authInfo);
    mockApi.onGet('/favorite').reply(200, serverFavoriteOffers);

    await checkAuthAction()(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      setUserInfo(authInfo),
      setError(null),
      fillFavoriteOffers(serverFavoriteOffers.map(adaptServerOfferToClientOffer)),
      setError(null),
    ]);
  });

  it('checkAuthAction dispatches unauthorized status on failure', async () => {
    mockApi.onGet('/login').reply(401);

    await checkAuthAction()(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      requireAuthorization(AuthorizationStatus.NoAuth),
      setUserInfo(null),
      fillFavoriteOffers([]),
    ]);
  });

  it('fetchOfferPageDataAction dispatches loaded offer page data on success', async () => {
    const offerId = '1';
    const serverOffer = makeServerOffer({ id: offerId });
    const serverNearbyOffers = [makeServerOffer({ id: '2' }), makeServerOffer({ id: '3' })];
    const serverReviews = [makeServerReview(), makeServerReview({ id: '2' })];

    mockApi.onGet(`/offers/${offerId}`).reply(200, serverOffer);
    mockApi.onGet(`/offers/${offerId}/nearby`).reply(200, serverNearbyOffers);
    mockApi.onGet(`/comments/${offerId}`).reply(200, serverReviews);

    await fetchOfferPageDataAction(offerId)(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      setOfferLoading(true),
      fillCurrentOffer(adaptServerOfferToClientOffer(serverOffer)),
      fillNearbyOffers(serverNearbyOffers.map(adaptServerOfferToClientOffer)),
      fillReviews(serverReviews.map(adaptServerReviewToClientReview)),
      setError(null),
      setOfferLoading(false),
    ]);
  });

  it('fetchOfferPageDataAction dispatches fallback state on failure', async () => {
    const offerId = '1';
    mockApi.onGet(`/offers/${offerId}`).reply(404);
    mockApi.onGet(`/offers/${offerId}/nearby`).reply(404);
    mockApi.onGet(`/comments/${offerId}`).reply(404);

    await fetchOfferPageDataAction(offerId)(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      setOfferLoading(true),
      fillCurrentOffer(null),
      fillNearbyOffers([]),
      fillReviews([]),
      setError('Server is unavailable. Please try again later.'),
      setOfferLoading(false),
    ]);
  });

  it('postReviewAction dispatches review submit lifecycle', async () => {
    const offerId = '1';
    const reviewData = {
      comment: 'A'.repeat(60),
      rating: 5,
    };
    const serverReviews = [makeServerReview()];
    mockApi.onPost(`/comments/${offerId}`).reply(200, serverReviews);

    await postReviewAction(offerId, reviewData)(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      setReviewSubmitting(true),
      setReviewError(null),
      fillReviews(serverReviews.map(adaptServerReviewToClientReview)),
      setError(null),
      setReviewSubmitting(false),
    ]);
  });

  it('postReviewAction resets submitting flag on failure', async () => {
    const offerId = '1';
    const reviewData = {
      comment: 'A'.repeat(60),
      rating: 5,
    };
    mockApi.onPost(`/comments/${offerId}`).reply(400);

    await postReviewAction(offerId, reviewData)(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      setReviewSubmitting(true),
      setReviewError(null),
      setReviewError('Could not send your review. Please try again.'),
      setReviewSubmitting(false),
    ]);
  });

  it('updateFavoriteStatusAction dispatches updated favorite offer', async () => {
    const offerId = '1';
    const serverOffer = makeServerOffer({ id: offerId, isFavorite: true });
    mockApi.onPost(`/favorite/${offerId}/1`).reply(200, serverOffer);

    await updateFavoriteStatusAction(offerId, false)(dispatch, () => initialState, api);

    expect(getDispatchedActions()).toEqual([
      updateFavoriteOffer(adaptServerOfferToClientOffer(serverOffer)),
      setError(null),
    ]);
  });
});
