import type { CityName, Offer } from '../types/offer';

export const Action = {
  ChangeCity: 'city/change',
  FillOffers: 'offers/fill',
  SetOffersLoading: 'offers/setLoading',
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

export type Actions = ChangeCityAction | FillOffersAction | SetOffersLoadingAction;

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
