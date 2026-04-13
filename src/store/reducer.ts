import { Action } from './action';
import type { Actions } from './action';
import type { CityName, Offer } from '../types/offer';

export type State = {
  city: CityName;
  offers: Offer[];
  isOffersLoading: boolean;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersLoading: true,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case Action.ChangeCity:
      return {
        ...state,
        city: action.payload,
      };
    case Action.FillOffers:
      return {
        ...state,
        offers: action.payload,
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
