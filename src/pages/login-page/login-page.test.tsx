import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { renderWithProviders } from '../../test-utils';
import LoginPage from './login-page';

const navigateMock = vi.fn();
const loginAction = vi.fn((payload: { email: string; password: string }) => async () => Promise.resolve(payload));

vi.mock('../../store/api-actions', () => ({
  loginAction: (...args: [{ email: string; password: string }]) => loginAction(...args),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('LoginPage', () => {
  it('renders login form', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('dispatches login action and navigates to root on submit', async () => {
    renderWithProviders(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@mail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123456' },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }).closest('form') as HTMLFormElement);

    await waitFor(() => {
      expect(loginAction).toHaveBeenCalledWith({
        email: 'test@mail.com',
        password: '123456',
      });
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('redirects authorized user from login page', () => {
    renderWithProviders(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<div>Main page</div>} />
      </Routes>,
      {
        route: '/login',
        preloadedState: {
          user: {
            authorizationStatus: AuthorizationStatus.Auth,
          },
        },
      }
    );

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
