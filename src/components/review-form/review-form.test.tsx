import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import ReviewForm from './review-form';

const postReviewAction = vi.fn((offerId: string, reviewData: { comment: string; rating: number }) =>
  async () => Promise.resolve({ offerId, reviewData })
);

vi.mock('../../store/api-actions', () => ({
  postReviewAction: (...args: [string, { comment: string; rating: number }]) => postReviewAction(...args),
}));

describe('ReviewForm', () => {
  it('renders disabled submit button initially', () => {
    renderWithProviders(<ReviewForm offerId="1" />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('submits form with entered rating and comment', async () => {
    renderWithProviders(<ReviewForm offerId="1" />);

    fireEvent.click(screen.getByTitle('perfect'));
    fireEvent.change(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved'), {
      target: { value: 'A'.repeat(60) },
    });

    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }).closest('form') as HTMLFormElement);

    await waitFor(() => {
      expect(postReviewAction).toHaveBeenCalledWith('1', {
        comment: 'A'.repeat(60),
        rating: 5,
      });
    });
  });
});
