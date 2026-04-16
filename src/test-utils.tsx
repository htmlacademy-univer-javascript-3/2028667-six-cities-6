import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { reducer } from './store/reducer';
import type { RootState } from './store';

const defaultState = reducer(undefined, { type: 'UNKNOWN_ACTION' } as never);

type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>;
  route?: string;
};

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer,
    preloadedState: {
      ...defaultState,
      ...preloadedState,
      app: {
        ...defaultState.app,
        ...preloadedState?.app,
      },
      user: {
        ...defaultState.user,
        ...preloadedState?.user,
      },
      catalog: {
        ...defaultState.catalog,
        ...preloadedState?.catalog,
      },
      offerPage: {
        ...defaultState.offerPage,
        ...preloadedState?.offerPage,
      },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = '/' }: ExtendedRenderOptions = {}
) {
  const store = makeStore(preloadedState);

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  };
}
