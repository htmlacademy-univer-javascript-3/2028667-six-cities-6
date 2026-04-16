import { Action } from '../action';
import type { Actions } from '../action';
import type { Offer } from '../../types/offer';
import type { Review } from '../../types/review';

export type OfferPageState = {
  nearbyOffers: Offer[];
  currentOffer: Offer | null;
  reviews: Review[];
  isOfferLoading: boolean;
  isReviewSubmitting: boolean;
};

const initialState: OfferPageState = {
  nearbyOffers: [],
  currentOffer: null,
  reviews: [],
  isOfferLoading: true,
  isReviewSubmitting: false,
};

export function offerPageReducer(state: OfferPageState = initialState, action: Actions): OfferPageState {
  switch (action.type) {
    case Action.ToggleFavorite:
      return {
        ...state,
        nearbyOffers: state.nearbyOffers.map((offer) => (
          offer.id === action.payload
            ? { ...offer, isFavorite: !offer.isFavorite }
            : offer
        )),
        currentOffer: state.currentOffer?.id === action.payload
          ? { ...state.currentOffer, isFavorite: !state.currentOffer.isFavorite }
          : state.currentOffer,
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
    default:
      return state;
  }
}
