import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeReview } from '../../store/test-data';
import ReviewsList from './reviews-list';

describe('ReviewsList', () => {
  it('renders reviews counter and review items', () => {
    const reviews = [
      makeReview({ id: '1', comment: 'First review' }),
      makeReview({ id: '2', comment: 'Second review' }),
    ];

    render(<ReviewsList reviews={reviews} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('First review')).toBeInTheDocument();
    expect(screen.getByText('Second review')).toBeInTheDocument();
  });
});
