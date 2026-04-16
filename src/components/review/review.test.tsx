import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeReview } from '../../store/test-data';
import Review from './review';

describe('Review', () => {
  it('renders review content', () => {
    const review = makeReview({
      user: {
        name: 'Max',
        avatarUrl: 'img/max.jpg',
        isPro: false,
      },
      comment: 'Very good place to stay',
      date: '2024-03-10T12:00:00.000Z',
    });

    render(<Review review={review} />);

    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Very good place to stay')).toBeInTheDocument();
    expect(screen.getByText('March 2024')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', 'img/max.jpg');
  });
});
