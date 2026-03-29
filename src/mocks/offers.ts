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

export const cityLocations: Record<CityName, Location> = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 12,
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 12,
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 12,
  },
  Amsterdam: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 12,
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 12,
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 12,
  },
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
    city: 'Paris',
    location: {
      latitude: 48.86015,
      longitude: 2.3274,
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
    city: 'Cologne',
    location: {
      latitude: 50.9402,
      longitude: 6.9578,
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
    city: 'Hamburg',
    location: {
      latitude: 53.5488,
      longitude: 9.9872,
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
  {
    id: 'amsterdam-museum-quarter-flat',
    city: 'Amsterdam',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    title: 'Museum Quarter flat with balcony',
    type: 'Apartment',
    price: 118,
    rating: 4.3,
    imageUrl: 'img/room.jpg',
    isPremium: false,
    isFavorite: false,
    description: 'Quiet flat near the museums with a small balcony, wooden floors and fast tram access.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Balcony', 'Coffee machine'],
    host: {
      name: 'Noah',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      'img/room.jpg',
      'img/apartment-02.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
  },
  {
    id: 'amsterdam-east-dock-loft',
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 12,
    },
    title: 'East Dock loft with skyline view',
    type: 'Loft',
    price: 154,
    rating: 4.8,
    imageUrl: 'img/apartment-01.jpg',
    isPremium: true,
    isFavorite: false,
    description: 'Open loft with big windows, modern furniture and an easy ride to the central station.',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Workspace', 'Heating', 'Dishwasher'],
    host: {
      name: 'Lars',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
    ],
  },
  {
    id: 'amsterdam-river-side-home',
    city: 'Amsterdam',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 12,
    },
    title: 'River side home near Java Island',
    type: 'Apartment',
    price: 142,
    rating: 4.5,
    imageUrl: 'img/apartment-03.jpg',
    isPremium: false,
    isFavorite: true,
    description: 'Comfortable apartment near the water with calm surroundings and plenty of natural light.',
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Kitchen', 'Fridge', 'Towels'],
    host: {
      name: 'Mila',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      'img/apartment-03.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
    ],
  },
  {
    id: 'brussels-grand-place-room',
    city: 'Brussels',
    location: {
      latitude: 50.8476,
      longitude: 4.3572,
      zoom: 12,
    },
    title: 'Grand Place room in the center',
    type: 'Room',
    price: 96,
    rating: 4.0,
    imageUrl: 'img/room.jpg',
    isPremium: false,
    isFavorite: false,
    description: 'Compact room a short walk from Grand Place with a tidy workspace and quiet evenings.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating', 'Workspace'],
    host: {
      name: 'Claire',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    images: [
      'img/room.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
  },
  {
    id: 'dusseldorf-rhine-studio',
    city: 'Dusseldorf',
    location: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 12,
    },
    title: 'Rhine embankment studio',
    type: 'Studio',
    price: 104,
    rating: 4.2,
    imageUrl: 'img/studio-01.jpg',
    isPremium: false,
    isFavorite: true,
    description: 'Small but bright studio near the Rhine promenade, ideal for a weekend city break.',
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Coffee machine'],
    host: {
      name: 'Jonas',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      'img/studio-01.jpg',
      'img/room.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
    ],
  },
];
