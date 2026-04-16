import { Action } from '../action';
import type { Actions } from '../action';
import type { Offer } from '../../types/offer';

export type CatalogState = {
  offers: Offer[];
  favoriteOffers: Offer[];
  isOffersLoading: boolean;
};

const initialState: CatalogState = {
  offers: [],
  favoriteOffers: [],
  isOffersLoading: true,
};

export function catalogReducer(state: CatalogState = initialState, action: Actions): CatalogState {
  switch (action.type) {
    case Action.FillOffers:
      return {
        ...state,
        offers: action.payload,
      };
    case Action.FillFavoriteOffers:
      return {
        ...state,
        favoriteOffers: action.payload,
      };
    case Action.UpdateFavoriteOffer:
      return {
        ...state,
        offers: state.offers.map((offer) => (
          offer.id === action.payload.id
            ? action.payload
            : offer
        )),
        favoriteOffers: action.payload.isFavorite
          ? [
            ...state.favoriteOffers.filter((offer) => offer.id !== action.payload.id),
            action.payload,
          ]
          : state.favoriteOffers.filter((offer) => offer.id !== action.payload.id),
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
