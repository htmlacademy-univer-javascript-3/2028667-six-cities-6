import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { renderWithProviders } from '../../test-utils';
import PrivateRoute from './private-route';

describe('PrivateRoute', () => {
  it('renders children for authorized user', () => {
    renderWithProviders(
      <Routes>
        <Route
          path="/favorites"
          element={(
            <PrivateRoute>
              <div>Private content</div>
            </PrivateRoute>
          )}
        />
      </Routes>,
      {
        route: '/favorites',
        preloadedState: {
          user: {
            authorizationStatus: AuthorizationStatus.Auth,
          },
        },
      }
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('redirects unauthorized user to login', () => {
    renderWithProviders(
      <Routes>
        <Route
          path="/favorites"
          element={(
            <PrivateRoute>
              <div>Private content</div>
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>,
      {
        route: '/favorites',
      }
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
