import { Action } from '../action';
import type { Actions } from '../action';
import type { CityName } from '../../types/offer';

export type AppState = {
  city: CityName;
  error: string | null;
};

const initialState: AppState = {
  city: 'Paris',
  error: null,
};

export function appReducer(state: AppState = initialState, action: Actions): AppState {
  switch (action.type) {
    case Action.ChangeCity:
      return {
        ...state,
        city: action.payload,
      };
    case Action.SetError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
