import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { AuthorizationStatus } from '../const';
import {
  fillCurrentOffer,
  fillNearbyOffers,
  fillOffers,
  fillReviews,
  requireAuthorization,
  setOfferLoading,
  setOffersLoading,
  setReviewSubmitting,
  updateFavoriteOffer,
} from './action';
import type { Actions } from './action';
import { saveToken } from '../services/token';
import type { AuthData } from '../types/auth-data';
import type { AuthInfo } from '../types/auth-info';
import type { NewReview } from '../types/new-review';
import { adaptServerOfferToClientOffer } from '../types/server-offer';
import type { ServerOffer } from '../types/server-offer';
import { adaptServerReviewToClientReview } from '../types/server-review';
import type { ServerReview } from '../types/server-review';

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

export const fetchOfferPageDataAction = (offerId: string): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(setOfferLoading(true));

  try {
    const [offerResponse, nearbyOffersResponse, reviewsResponse] = await Promise.all([
      api.get<ServerOffer>(`/offers/${offerId}`),
      api.get<ServerOffer[]>(`/offers/${offerId}/nearby`),
      api.get<ServerReview[]>(`/comments/${offerId}`),
    ]);

    dispatch(fillCurrentOffer(adaptServerOfferToClientOffer(offerResponse.data)));
    dispatch(fillNearbyOffers(nearbyOffersResponse.data.map(adaptServerOfferToClientOffer)));
    dispatch(fillReviews(reviewsResponse.data.map(adaptServerReviewToClientReview)));
  } catch {
    dispatch(fillCurrentOffer(null));
    dispatch(fillNearbyOffers([]));
    dispatch(fillReviews([]));
  } finally {
    dispatch(setOfferLoading(false));
  }
};

export const postReviewAction = (offerId: string, reviewData: NewReview): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(setReviewSubmitting(true));

  try {
    const { data } = await api.post<ServerReview[]>(`/comments/${offerId}`, reviewData);
    dispatch(fillReviews(data.map(adaptServerReviewToClientReview)));
  } finally {
    dispatch(setReviewSubmitting(false));
  }
};

export const updateFavoriteStatusAction = (offerId: string, isFavorite: boolean): ThunkActionResult => async (dispatch, _getState, api) => {
  const favoriteStatus = Number(!isFavorite);
  const { data } = await api.post<ServerOffer>(`/favorite/${offerId}/${favoriteStatus}`);
  dispatch(updateFavoriteOffer(adaptServerOfferToClientOffer(data)));
};
