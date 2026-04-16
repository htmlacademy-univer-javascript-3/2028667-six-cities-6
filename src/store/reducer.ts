import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './app/app';
import { catalogReducer } from './catalog/catalog';
import { offerPageReducer } from './offer-page/offer-page';
import { userReducer } from './user/user';

export const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  catalog: catalogReducer,
  offerPage: offerPageReducer,
});
