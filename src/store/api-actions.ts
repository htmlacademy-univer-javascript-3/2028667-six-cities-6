import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { AuthorizationStatus } from '../const';
import { fillOffers, requireAuthorization, setOffersLoading } from './action';
import type { Actions } from './action';
import { saveToken } from '../services/token';
import type { AuthData } from '../types/auth-data';
import type { AuthInfo } from '../types/auth-info';
import { adaptServerOfferToClientOffer } from '../types/server-offer';
import type { ServerOffer } from '../types/server-offer';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Actions>;

export const fetchOffersAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(setOffersLoading(true));
  const { data } = await api.get<ServerOffer[]>('/offers');
  dispatch(fillOffers(data.map(adaptServerOfferToClientOffer)));
  dispatch(setOffersLoading(false));
};

export const checkAuthAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.get('/login');
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
};

export const loginAction = ({ email, password }: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  const { data } = await api.post<AuthInfo>('/login', { email, password });

  saveToken(data.token);
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
};
