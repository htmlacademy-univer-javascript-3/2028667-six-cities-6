import type { CityName, Offer } from '../types/offer';
import type { AuthorizationStatus } from '../const';

export const Action = {
  ChangeCity: 'city/change',
  FillOffers: 'offers/fill',
  SetOffersLoading: 'offers/setLoading',
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

export type SetOffersLoadingAction = {
  type: typeof Action.SetOffersLoading;
  payload: boolean;
};

export type RequireAuthorizationAction = {
  type: typeof Action.RequireAuthorization;
  payload: AuthorizationStatus;
};

export type Actions = ChangeCityAction | FillOffersAction | SetOffersLoadingAction | RequireAuthorizationAction;

export const changeCity = (city: CityName): ChangeCityAction => ({
  type: Action.ChangeCity,
  payload: city,
});

export const fillOffers = (offers: Offer[]): FillOffersAction => ({
  type: Action.FillOffers,
  payload: offers,
});

export const setOffersLoading = (isLoading: boolean): SetOffersLoadingAction => ({
  type: Action.SetOffersLoading,
  payload: isLoading,
});

export const requireAuthorization = (authorizationStatus: AuthorizationStatus): RequireAuthorizationAction => ({
  type: Action.RequireAuthorization,
  payload: authorizationStatus,
});
