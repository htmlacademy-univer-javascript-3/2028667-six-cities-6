import type { CityName, Offer } from './offer';

type ServerLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type ServerCity = {
  name: CityName;
  location: ServerLocation;
};

type ServerHost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type ServerOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: ServerCity;
  location: ServerLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: ServerHost;
  images: string[];
  maxAdults: number;
};

export function adaptServerOfferToClientOffer(serverOffer: ServerOffer): Offer {
  return {
    id: serverOffer.id,
    city: serverOffer.city.name,
    location: serverOffer.location,
    title: serverOffer.title,
    type: serverOffer.type,
    price: serverOffer.price,
    rating: serverOffer.rating,
    imageUrl: serverOffer.previewImage,
    isPremium: serverOffer.isPremium,
    isFavorite: serverOffer.isFavorite,
    description: serverOffer.description,
    bedrooms: serverOffer.bedrooms,
    maxAdults: serverOffer.maxAdults,
    goods: serverOffer.goods,
    host: serverOffer.host,
    images: serverOffer.images,
  };
}
