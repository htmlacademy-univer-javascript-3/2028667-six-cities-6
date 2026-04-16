import { describe, expect, it } from 'vitest';
import { changeCity } from '../action';
import { appReducer } from './app';

describe('appReducer', () => {
  it('returns initial state for unknown action', () => {
    expect(appReducer(undefined, { type: 'UNKNOWN_ACTION' } as never)).toEqual({
      city: 'Paris',
    });
  });

  it('changes active city', () => {
    const initialState = {
      city: 'Paris' as const,
    };

    expect(appReducer(initialState, changeCity('Amsterdam'))).toEqual({
      city: 'Amsterdam',
    });
  });
});
