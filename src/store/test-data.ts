import type { Offer } from '../types/offer';
import type { Review } from '../types/review';
import type { ServerOffer } from '../types/server-offer';
import type { ServerReview } from '../types/server-review';

export function makeOffer(overrides: Partial<Offer> = {}): Offer {
  return {
    id: '1',
    city: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    },
    title: 'Test offer',
    type: 'apartment',
    price: 120,
    rating: 4.2,
    imageUrl: 'img/test.jpg',
    isPremium: false,
    isFavorite: false,
    description: 'Test description',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi'],
    host: {
      name: 'Host',
      avatarUrl: 'img/host.jpg',
      isPro: true,
    },
    images: ['img/test-1.jpg'],
    ...overrides,
  };
}

export function makeReview(overrides: Partial<Review> = {}): Review {
  return {
    id: '1',
    comment: 'Test comment',
    date: '2024-01-01T12:00:00.000Z',
    rating: 4,
    user: {
      name: 'Reviewer',
      avatarUrl: 'img/reviewer.jpg',
      isPro: false,
    },
    ...overrides,
  };
}

export function makeServerOffer(overrides: Partial<ServerOffer> = {}): ServerOffer {
  return {
    id: '1',
    title: 'Test offer',
    type: 'apartment',
    price: 120,
    previewImage: 'img/test.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12,
      },
    },
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    description: 'Test description',
    bedrooms: 2,
    goods: ['Wi-Fi'],
    host: {
      name: 'Host',
      avatarUrl: 'img/host.jpg',
      isPro: true,
    },
    images: ['img/test-1.jpg'],
    maxAdults: 3,
    ...overrides,
  };
}

export function makeServerReview(overrides: Partial<ServerReview> = {}): ServerReview {
  return {
    id: '1',
    comment: 'Test comment',
    date: '2024-01-01T12:00:00.000Z',
    rating: 4,
    user: {
      name: 'Reviewer',
      avatarUrl: 'img/reviewer.jpg',
      isPro: false,
    },
    ...overrides,
  };
}
