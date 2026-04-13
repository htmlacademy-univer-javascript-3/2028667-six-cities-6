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
    description: '',
    bedrooms: 0,
    maxAdults: 0,
    goods: [],
    host: {
      name: '',
      avatarUrl: '',
      isPro: false,
    },
    images: [serverOffer.previewImage],
  };
}
