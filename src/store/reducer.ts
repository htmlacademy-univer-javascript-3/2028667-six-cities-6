import { Action } from './action';
import type { Actions } from './action';
import type { CityName, Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import type { AuthorizationStatus as AuthorizationStatusType } from '../const';
import type { Review } from '../types/review';

export type State = {
  city: CityName;
  offers: Offer[];
  nearbyOffers: Offer[];
  currentOffer: Offer | null;
  reviews: Review[];
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isReviewSubmitting: boolean;
  authorizationStatus: AuthorizationStatusType;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  nearbyOffers: [],
  currentOffer: null,
  reviews: [],
  isOffersLoading: true,
  isOfferLoading: true,
  isReviewSubmitting: false,
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
    case Action.FillNearbyOffers:
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    case Action.FillCurrentOffer:
      return {
        ...state,
        currentOffer: action.payload,
      };
    case Action.FillReviews:
      return {
        ...state,
        reviews: action.payload,
      };
    case Action.SetOffersLoading:
      return {
        ...state,
        isOffersLoading: action.payload,
      };
    case Action.SetOfferLoading:
      return {
        ...state,
        isOfferLoading: action.payload,
      };
    case Action.SetReviewSubmitting:
      return {
        ...state,
        isReviewSubmitting: action.payload,
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
