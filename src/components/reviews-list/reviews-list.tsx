import { memo } from 'react';
import Review from '../review/review';
import type { Review as ReviewType } from '../../types/review';

type ReviewsListProps = {
  reviews: ReviewType[];
  reviewsCount?: number;
};

function ReviewsList({ reviews, reviewsCount = reviews.length }: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviewsCount}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </ul>
    </>
  );
}

const MemoizedReviewsList = memo(ReviewsList);

export default MemoizedReviewsList;
