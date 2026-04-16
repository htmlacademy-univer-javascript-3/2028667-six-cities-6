import { describe, expect, it } from 'vitest';
import { reducer } from './reducer';

describe('root reducer', () => {
  it('returns combined initial state for unknown action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' } as never)).toEqual({
      app: {
        city: 'Paris',
      },
      user: {
        authorizationStatus: 'UNKNOWN',
      },
      catalog: {
        offers: [],
        isOffersLoading: true,
      },
      offerPage: {
        nearbyOffers: [],
        currentOffer: null,
        reviews: [],
        isOfferLoading: true,
        isReviewSubmitting: false,
      },
    });
  });
});
