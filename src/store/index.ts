import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import { requireAuthorization } from './action';
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
  store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
