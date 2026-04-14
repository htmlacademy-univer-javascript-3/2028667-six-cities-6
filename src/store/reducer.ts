import { Action } from './action';
import type { Actions } from './action';
import type { CityName, Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import type { AuthorizationStatus as AuthorizationStatusType } from '../const';

export type State = {
  city: CityName;
  offers: Offer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatusType;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    case Action.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    default:
      return state;
  }
}
