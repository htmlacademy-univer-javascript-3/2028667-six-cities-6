export type ReviewUser = {
  name: string;
  avatarUrl: string;
};

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: ReviewUser;
};

export const reviews: Review[] = [
  {
    id: 'review-max-april-2019',
    comment: 'A quiet cozy and picturesque place that hides behind a river by the unique lightness of Amsterdam. The building is green and from the 18th century.',
    date: '2019-04-24',
    rating: 4,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
  },
];
