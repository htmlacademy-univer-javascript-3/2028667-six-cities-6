import { describe, expect, it } from 'vitest';
import { changeCity } from '../action';
import { appReducer } from './app';

describe('appReducer', () => {
  it('returns initial state for unknown action', () => {
    expect(appReducer(undefined, { type: 'UNKNOWN_ACTION' } as never)).toEqual({
      city: 'Paris',
      error: null,
    });
  });

  it('changes active city', () => {
    const initialState = {
      city: 'Paris' as const,
      error: null,
    };

    expect(appReducer(initialState, changeCity('Amsterdam'))).toEqual({
      city: 'Amsterdam',
      error: null,
    });
  });
});
