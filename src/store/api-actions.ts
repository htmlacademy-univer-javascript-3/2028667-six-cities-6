import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { fillOffers, setOffersLoading } from './action';
import type { Actions } from './action';
import { adaptServerOfferToClientOffer } from '../types/server-offer';
import type { ServerOffer } from '../types/server-offer';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Actions>;

export const fetchOffersAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(setOffersLoading(true));
  const { data } = await api.get<ServerOffer[]>('/offers');
  dispatch(fillOffers(data.map(adaptServerOfferToClientOffer)));
  dispatch(setOffersLoading(false));
};
