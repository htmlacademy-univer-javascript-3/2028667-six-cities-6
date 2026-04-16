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
  reviewError: string | null;
};

const initialState: OfferPageState = {
  nearbyOffers: [],
  currentOffer: null,
  reviews: [],
  isOfferLoading: true,
  isReviewSubmitting: false,
  reviewError: null,
};

export function offerPageReducer(state: OfferPageState = initialState, action: Actions): OfferPageState {
  switch (action.type) {
    case Action.UpdateFavoriteOffer:
      return {
        ...state,
        nearbyOffers: state.nearbyOffers.map((offer) => (
          offer.id === action.payload.id
            ? action.payload
            : offer
        )),
        currentOffer: state.currentOffer?.id === action.payload.id
          ? action.payload
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
    case Action.SetReviewError:
      return {
        ...state,
        reviewError: action.payload,
      };
    default:
      return state;
  }
}
