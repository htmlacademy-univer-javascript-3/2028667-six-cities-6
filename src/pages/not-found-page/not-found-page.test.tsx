import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import NotFoundPage from './not-found-page';

describe('NotFoundPage', () => {
  it('renders not found content and link to main page', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to main page' })).toHaveAttribute('href', '/');
  });
});
