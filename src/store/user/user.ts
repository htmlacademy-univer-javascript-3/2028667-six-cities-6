import { AuthorizationStatus } from '../../const';
import type { AuthorizationStatus as AuthorizationStatusType } from '../../const';
import { Action } from '../action';
import type { Actions } from '../action';

export type UserState = {
  authorizationStatus: AuthorizationStatusType;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export function userReducer(state: UserState = initialState, action: Actions): UserState {
  switch (action.type) {
    case Action.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    default:
      return state;
  }
}
