import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import FavoritesEmptyPage from './favorites-empty-page';

describe('FavoritesEmptyPage', () => {
  it('renders empty favorites state', () => {
    renderWithProviders(<FavoritesEmptyPage />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
