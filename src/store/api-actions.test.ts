import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import {
  fillCurrentOffer,
  fillNearbyOffers,
  fillOffers,
  fillReviews,
  requireAuthorization,
  setOfferLoading,
  setOffersLoading,
  setReviewSubmitting,
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

  beforeEach(() => {
    mockApi = new MockAdapter(api);
    dispatch = vi.fn();
  });

  afterEach(() => {
    mockApi.restore();
  });

  it('fetchOffersAction dispatches offers loading lifecycle', async () => {
    const serverOffers = [makeServerOffer(), makeServerOffer({ id: '2', city: { name: 'Amsterdam', location: { latitude: 52.37454, longitude: 4.897976, zoom: 12 } } })];
    mockApi.onGet('/offers').reply(200, serverOffers);

    await fetchOffersAction()(dispatch, () => initialState, api);

    expect(dispatch.mock.calls.flat()).toEqual([
      setOffersLoading(true),
      fillOffers(serverOffers.map(adaptServerOfferToClientOffer)),
      setOffersLoading(false),
    ]);
  });

  it('checkAuthAction dispatches authorized status on success', async () => {
    mockApi.onGet('/login').reply(200);

    await checkAuthAction()(dispatch, () => initialState, api);

    expect(dispatch.mock.calls.flat()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
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

    expect(dispatch.mock.calls.flat()).toEqual([
      setOfferLoading(true),
      fillCurrentOffer(adaptServerOfferToClientOffer(serverOffer)),
      fillNearbyOffers(serverNearbyOffers.map(adaptServerOfferToClientOffer)),
      fillReviews(serverReviews.map(adaptServerReviewToClientReview)),
      setOfferLoading(false),
    ]);
  });

  it('fetchOfferPageDataAction dispatches fallback state on failure', async () => {
    const offerId = '1';
    mockApi.onGet(`/offers/${offerId}`).reply(404);
    mockApi.onGet(`/offers/${offerId}/nearby`).reply(404);
    mockApi.onGet(`/comments/${offerId}`).reply(404);

    await fetchOfferPageDataAction(offerId)(dispatch, () => initialState, api);

    expect(dispatch.mock.calls.flat()).toEqual([
      setOfferLoading(true),
      fillCurrentOffer(null),
      fillNearbyOffers([]),
      fillReviews([]),
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

    expect(dispatch.mock.calls.flat()).toEqual([
      setReviewSubmitting(true),
      fillReviews(serverReviews.map(adaptServerReviewToClientReview)),
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

    await expect(postReviewAction(offerId, reviewData)(dispatch, () => initialState, api)).rejects.toThrow();

    expect(dispatch.mock.calls.flat()).toEqual([
      setReviewSubmitting(true),
      setReviewSubmitting(false),
    ]);
  });

  it('updateFavoriteStatusAction dispatches updated favorite offer', async () => {
    const offerId = '1';
    const serverOffer = makeServerOffer({ id: offerId, isFavorite: true });
    mockApi.onPost(`/favorite/${offerId}/1`).reply(200, serverOffer);

    await updateFavoriteStatusAction(offerId, false)(dispatch, () => initialState, api);

    expect(dispatch.mock.calls.flat()).toEqual([
      updateFavoriteOffer(adaptServerOfferToClientOffer(serverOffer)),
    ]);
  });
});
