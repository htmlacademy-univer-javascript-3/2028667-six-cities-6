import type { CityName, Offer } from '../types/offer';
import type { AuthorizationStatus } from '../const';
import type { Review } from '../types/review';

export const Action = {
  ChangeCity: 'city/change',
  FillOffers: 'offers/fill',
  UpdateFavoriteOffer: 'offers/updateFavoriteOffer',
  FillNearbyOffers: 'offers/fillNearby',
  FillCurrentOffer: 'offers/fillCurrent',
  FillReviews: 'reviews/fill',
  SetOffersLoading: 'offers/setLoading',
  SetOfferLoading: 'offer/setLoading',
  SetReviewSubmitting: 'review/setSubmitting',
  RequireAuthorization: 'user/requireAuthorization',
} as const;

export type ActionType = typeof Action[keyof typeof Action];

export type ChangeCityAction = {
  type: typeof Action.ChangeCity;
  payload: CityName;
};

export type FillOffersAction = {
  type: typeof Action.FillOffers;
  payload: Offer[];
};

export type UpdateFavoriteOfferAction = {
  type: typeof Action.UpdateFavoriteOffer;
  payload: Offer;
};

export type FillNearbyOffersAction = {
  type: typeof Action.FillNearbyOffers;
  payload: Offer[];
};

export type FillCurrentOfferAction = {
  type: typeof Action.FillCurrentOffer;
  payload: Offer | null;
};

export type FillReviewsAction = {
  type: typeof Action.FillReviews;
  payload: Review[];
};

export type SetOffersLoadingAction = {
  type: typeof Action.SetOffersLoading;
  payload: boolean;
};

export type SetOfferLoadingAction = {
  type: typeof Action.SetOfferLoading;
  payload: boolean;
};

export type SetReviewSubmittingAction = {
  type: typeof Action.SetReviewSubmitting;
  payload: boolean;
};

export type RequireAuthorizationAction = {
  type: typeof Action.RequireAuthorization;
  payload: AuthorizationStatus;
};

export type Actions =
  ChangeCityAction |
  FillOffersAction |
  UpdateFavoriteOfferAction |
  FillNearbyOffersAction |
  FillCurrentOfferAction |
  FillReviewsAction |
  SetOffersLoadingAction |
  SetOfferLoadingAction |
  SetReviewSubmittingAction |
  RequireAuthorizationAction;

export const changeCity = (city: CityName): ChangeCityAction => ({
  type: Action.ChangeCity,
  payload: city,
});

export const fillOffers = (offers: Offer[]): FillOffersAction => ({
  type: Action.FillOffers,
  payload: offers,
});

export const updateFavoriteOffer = (offer: Offer): UpdateFavoriteOfferAction => ({
  type: Action.UpdateFavoriteOffer,
  payload: offer,
});

export const fillNearbyOffers = (offers: Offer[]): FillNearbyOffersAction => ({
  type: Action.FillNearbyOffers,
  payload: offers,
});

export const fillCurrentOffer = (offer: Offer | null): FillCurrentOfferAction => ({
  type: Action.FillCurrentOffer,
  payload: offer,
});

export const fillReviews = (reviews: Review[]): FillReviewsAction => ({
  type: Action.FillReviews,
  payload: reviews,
});

export const setOffersLoading = (isLoading: boolean): SetOffersLoadingAction => ({
  type: Action.SetOffersLoading,
  payload: isLoading,
});

export const setOfferLoading = (isLoading: boolean): SetOfferLoadingAction => ({
  type: Action.SetOfferLoading,
  payload: isLoading,
});

export const setReviewSubmitting = (isSubmitting: boolean): SetReviewSubmittingAction => ({
  type: Action.SetReviewSubmitting,
  payload: isSubmitting,
});

export const requireAuthorization = (authorizationStatus: AuthorizationStatus): RequireAuthorizationAction => ({
  type: Action.RequireAuthorization,
  payload: authorizationStatus,
});
