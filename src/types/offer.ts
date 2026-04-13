import type { cities } from '../const';

export type CityName = (typeof cities)[number];

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Offer = {
  id: string;
  city: CityName;
  location: Location;
  title: string;
  type: string;
  price: number;
  rating: number;
  imageUrl: string;
  isPremium: boolean;
  isFavorite: boolean;
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
  images: string[];
};
