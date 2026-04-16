import { describe, expect, it } from 'vitest';
import { fillOffers, setOffersLoading, updateFavoriteOffer } from '../action';
import { makeOffer } from '../test-data';
import { catalogReducer } from './catalog';

describe('catalogReducer', () => {
  it('returns initial state for unknown action', () => {
    expect(catalogReducer(undefined, { type: 'UNKNOWN_ACTION' } as never)).toEqual({
      offers: [],
      isOffersLoading: true,
    });
  });

  it('fills offers list', () => {
    const offers = [makeOffer(), makeOffer({ id: '2', city: 'Amsterdam' })];

    expect(catalogReducer(undefined, fillOffers(offers))).toEqual({
      offers,
      isOffersLoading: true,
    });
  });

  it('updates favorite offer by id', () => {
    const initialState = {
      offers: [makeOffer(), makeOffer({ id: '2' })],
      isOffersLoading: false,
    };
    const updatedOffer = makeOffer({ id: '2', isFavorite: true, title: 'Updated offer' });

    expect(catalogReducer(initialState, updateFavoriteOffer(updatedOffer))).toEqual({
      offers: [initialState.offers[0], updatedOffer],
      isOffersLoading: false,
    });
  });

  it('changes loading status', () => {
    const initialState = {
      offers: [makeOffer()],
      isOffersLoading: true,
    };

    expect(catalogReducer(initialState, setOffersLoading(false))).toEqual({
      offers: initialState.offers,
      isOffersLoading: false,
    });
  });
});
