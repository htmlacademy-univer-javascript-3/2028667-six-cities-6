import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import { fillFavoriteOffers, requireAuthorization, setUserInfo } from './action';
import { dropToken } from '../services/token';
import { reducer } from './reducer';

let handleUnauthorized: (() => void) | null = null;

const apiInstance = createAPI(() => {
  handleUnauthorized?.();
});

const appStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: apiInstance,
    },
  }),
});

export const api = apiInstance;
export const store = appStore;
handleUnauthorized = () => {
  dropToken();
  store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  store.dispatch(setUserInfo(null));
  store.dispatch(fillFavoriteOffers([]));
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
