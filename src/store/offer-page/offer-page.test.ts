import { describe, expect, it } from 'vitest';
import {
  fillCurrentOffer,
  fillNearbyOffers,
  fillReviews,
  setOfferLoading,
  setReviewSubmitting,
  updateFavoriteOffer,
} from '../action';
import { makeOffer, makeReview } from '../test-data';
import { offerPageReducer } from './offer-page';

describe('offerPageReducer', () => {
  it('returns initial state for unknown action', () => {
    expect(offerPageReducer(undefined, { type: 'UNKNOWN_ACTION' } as never)).toEqual({
      nearbyOffers: [],
      currentOffer: null,
      reviews: [],
      isOfferLoading: true,
      isReviewSubmitting: false,
    });
  });

  it('fills nearby offers', () => {
    const nearbyOffers = [makeOffer(), makeOffer({ id: '2' })];

    expect(offerPageReducer(undefined, fillNearbyOffers(nearbyOffers))).toEqual({
      nearbyOffers,
      currentOffer: null,
      reviews: [],
      isOfferLoading: true,
      isReviewSubmitting: false,
    });
  });

  it('fills current offer', () => {
    const offer = makeOffer();

    expect(offerPageReducer(undefined, fillCurrentOffer(offer))).toEqual({
      nearbyOffers: [],
      currentOffer: offer,
      reviews: [],
      isOfferLoading: true,
      isReviewSubmitting: false,
    });
  });

  it('fills reviews', () => {
    const reviews = [makeReview(), makeReview({ id: '2' })];

    expect(offerPageReducer(undefined, fillReviews(reviews))).toEqual({
      nearbyOffers: [],
      currentOffer: null,
      reviews,
      isOfferLoading: true,
      isReviewSubmitting: false,
    });
  });

  it('updates favorite offer in nearby offers and current offer', () => {
    const currentOffer = makeOffer({ id: '1', isFavorite: false });
    const nearbyOffer = makeOffer({ id: '2', isFavorite: false });
    const updatedCurrentOffer = makeOffer({ id: '1', isFavorite: true, title: 'Updated current offer' });
    const initialState = {
      nearbyOffers: [nearbyOffer, makeOffer({ id: '3' })],
      currentOffer,
      reviews: [makeReview()],
      isOfferLoading: false,
      isReviewSubmitting: false,
    };

    expect(offerPageReducer(initialState, updateFavoriteOffer(updatedCurrentOffer))).toEqual({
      nearbyOffers: initialState.nearbyOffers,
      currentOffer: updatedCurrentOffer,
      reviews: initialState.reviews,
      isOfferLoading: false,
      isReviewSubmitting: false,
    });
  });

  it('updates matching nearby offer by id', () => {
    const nearbyOffer = makeOffer({ id: '2', isFavorite: false });
    const updatedNearbyOffer = makeOffer({ id: '2', isFavorite: true, title: 'Updated nearby offer' });
    const initialState = {
      nearbyOffers: [nearbyOffer, makeOffer({ id: '3' })],
      currentOffer: makeOffer({ id: '1' }),
      reviews: [],
      isOfferLoading: false,
      isReviewSubmitting: false,
    };

    expect(offerPageReducer(initialState, updateFavoriteOffer(updatedNearbyOffer))).toEqual({
      nearbyOffers: [updatedNearbyOffer, initialState.nearbyOffers[1]],
      currentOffer: initialState.currentOffer,
      reviews: [],
      isOfferLoading: false,
      isReviewSubmitting: false,
    });
  });

  it('changes offer loading status', () => {
    const initialState = {
      nearbyOffers: [],
      currentOffer: null,
      reviews: [],
      isOfferLoading: true,
      isReviewSubmitting: false,
    };

    expect(offerPageReducer(initialState, setOfferLoading(false))).toEqual({
      ...initialState,
      isOfferLoading: false,
    });
  });

  it('changes review submitting status', () => {
    const initialState = {
      nearbyOffers: [],
      currentOffer: null,
      reviews: [],
      isOfferLoading: false,
      isReviewSubmitting: false,
    };

    expect(offerPageReducer(initialState, setReviewSubmitting(true))).toEqual({
      ...initialState,
      isReviewSubmitting: true,
    });
  });
});
