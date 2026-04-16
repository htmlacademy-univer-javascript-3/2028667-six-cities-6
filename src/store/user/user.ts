import type { AuthInfo } from '../../types/auth-info';
import { AuthorizationStatus } from '../../const';
import type { AuthorizationStatus as AuthorizationStatusType } from '../../const';
import { Action } from '../action';
import type { Actions } from '../action';

export type UserState = {
  authorizationStatus: AuthorizationStatusType;
  userInfo: AuthInfo | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export function userReducer(state: UserState = initialState, action: Actions): UserState {
  switch (action.type) {
    case Action.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case Action.SetUserInfo:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}
