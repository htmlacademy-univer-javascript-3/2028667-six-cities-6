import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import { requireAuthorization } from './action';
import { reducer } from './reducer';

export const api = createAPI(() => {
  store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
