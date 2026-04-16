import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OfferNotLoggedPage from './offer-not-logged-page';

describe('OfferNotLoggedPage', () => {
  it('renders unauthenticated offer page layout', () => {
    render(<OfferNotLoggedPage />);

    expect(screen.getByText('Beautiful & luxurious studio at great location')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});
