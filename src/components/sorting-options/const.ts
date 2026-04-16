export const sortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

export type SortingOption = (typeof sortingOptions)[number];
