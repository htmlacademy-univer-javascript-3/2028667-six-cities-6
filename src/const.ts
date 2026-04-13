import type { CityName, Location } from './types/offer';

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

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
