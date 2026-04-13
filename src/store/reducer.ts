import { Action } from './action';
import type { Actions } from './action';
import { offers } from '../mocks/offers';
import type { CityName, Offer } from '../mocks/offers';

export type State = {
  city: CityName;
  offers: Offer[];
};

export const initialState: State = {
  city: 'Paris',
  offers,
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
    default:
      return state;
  }
}
