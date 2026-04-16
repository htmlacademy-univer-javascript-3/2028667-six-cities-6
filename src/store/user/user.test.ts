import { describe, expect, it } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization } from '../action';
import { userReducer } from './user';

describe('userReducer', () => {
  it('returns initial state for unknown action', () => {
    expect(userReducer(undefined, { type: 'UNKNOWN_ACTION' } as never)).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
    });
  });

  it('updates authorization status', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };

    expect(userReducer(initialState, requireAuthorization(AuthorizationStatus.Auth))).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
    });
  });
});
