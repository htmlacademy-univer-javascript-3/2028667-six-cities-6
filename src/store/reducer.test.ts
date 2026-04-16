import { describe, expect, it } from 'vitest';
import { reducer } from './reducer';

describe('root reducer', () => {
  it('returns combined initial state for unknown action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' } as never)).toEqual({
      app: {
        city: 'Paris',
        error: null,
      },
      user: {
        authorizationStatus: 'UNKNOWN',
        userInfo: null,
      },
      catalog: {
        offers: [],
        favoriteOffers: [],
        isOffersLoading: true,
      },
      offerPage: {
        nearbyOffers: [],
        currentOffer: null,
        reviews: [],
        isOfferLoading: true,
        isReviewSubmitting: false,
        reviewError: null,
      },
    });
  });
});
