import { Action } from '../action';
import type { Actions } from '../action';
import type { Offer } from '../../types/offer';

export type CatalogState = {
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: CatalogState = {
  offers: [],
  isOffersLoading: true,
};

export function catalogReducer(state: CatalogState = initialState, action: Actions): CatalogState {
  switch (action.type) {
    case Action.FillOffers:
      return {
        ...state,
        offers: action.payload,
      };
    case Action.ToggleFavorite:
      return {
        ...state,
        offers: state.offers.map((offer) => (
          offer.id === action.payload
            ? { ...offer, isFavorite: !offer.isFavorite }
            : offer
        )),
      };
    case Action.SetOffersLoading:
      return {
        ...state,
        isOffersLoading: action.payload,
      };
    default:
      return state;
  }
}
