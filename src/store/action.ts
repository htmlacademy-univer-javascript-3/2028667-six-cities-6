import { offers } from '../mocks/offers';
import type { CityName, Offer } from '../mocks/offers';

export const Action = {
  ChangeCity: 'city/change',
  FillOffers: 'offers/fill',
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

export type Actions = ChangeCityAction | FillOffersAction;

export const changeCity = (city: CityName): ChangeCityAction => ({
  type: Action.ChangeCity,
  payload: city,
});

export const fillOffers = (): FillOffersAction => ({
  type: Action.FillOffers,
  payload: offers,
});
