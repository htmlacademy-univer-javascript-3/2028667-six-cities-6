export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

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

export const offers: Offer[] = [
  {
    id: 'amsterdam-canal-view',
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4.7,
    imageUrl: 'img/apartment-02.jpg',
    isPremium: true,
    isFavorite: false,
    description: 'Bright apartment in the historic center with canal views and a quiet inner courtyard.',
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Kitchen', 'Coffee machine', 'Washing machine', 'Towels'],
    host: {
      name: 'Emma',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: [
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
    ],
  },
  {
    id: 'paris-seine-studio',
    city: 'Amsterdam',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    title: 'Compact studio near the Seine',
    type: 'Studio',
    price: 110,
    rating: 4.1,
    imageUrl: 'img/studio-01.jpg',
    isPremium: false,
    isFavorite: true,
    description: 'Compact studio with quick access to the embankment, cafes and central metro lines.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Air conditioning', 'Kitchen', 'Coffee machine'],
    host: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      'img/studio-01.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
    ],
  },
  {
    id: 'cologne-skyline-loft',
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 12,
    },
    title: 'Modern loft with skyline view',
    type: 'Loft',
    price: 150,
    rating: 4.9,
    imageUrl: 'img/apartment-01.jpg',
    isPremium: true,
    isFavorite: false,
    description: 'Spacious loft with panoramic windows, dedicated workspace and skyline views.',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Workspace', 'Dishwasher', 'Heating', 'Kitchen'],
    host: {
      name: 'Lukas',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
    ],
  },
  {
    id: 'hamburg-river-apartment',
    city: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 12,
    },
    title: 'Bright apartment by the river',
    type: 'Apartment',
    price: 140,
    rating: 4.5,
    imageUrl: 'img/apartment-03.jpg',
    isPremium: false,
    isFavorite: true,
    description: 'Calm apartment near the river promenade with a balcony and lots of natural light.',
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Balcony', 'Kitchen', 'Fridge', 'Towels'],
    host: {
      name: 'Mia',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    images: [
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/apartment-02.jpg',
      'img/studio-01.jpg',
    ],
  },
];
