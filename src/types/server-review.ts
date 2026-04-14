import type { Review } from './review';

type ServerReviewUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type ServerReview = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: ServerReviewUser;
};

export function adaptServerReviewToClientReview(serverReview: ServerReview): Review {
  return {
    id: serverReview.id,
    comment: serverReview.comment,
    date: serverReview.date,
    rating: serverReview.rating,
    user: serverReview.user,
  };
}
