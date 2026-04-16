import { Action } from '../action';
import type { Actions } from '../action';
import type { CityName } from '../../types/offer';

export type AppState = {
  city: CityName;
};

const initialState: AppState = {
  city: 'Paris',
};

export function appReducer(state: AppState = initialState, action: Actions): AppState {
  switch (action.type) {
    case Action.ChangeCity:
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
}
