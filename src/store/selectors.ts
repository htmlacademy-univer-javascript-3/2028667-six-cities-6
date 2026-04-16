import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '.';
import type { CityName, Offer } from '../types/offer';

export const selectActiveCity = (state: RootState) => state.app.city;
export const selectOffers = (state: RootState) => state.catalog.offers;
export const selectNearbyOffers = (state: RootState) => state.offerPage.nearbyOffers;
export const selectCurrentOffer = (state: RootState) => state.offerPage.currentOffer;
export const selectReviews = (state: RootState) => state.offerPage.reviews;
export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectIsOffersLoading = (state: RootState) => state.catalog.isOffersLoading;
export const selectIsOfferLoading = (state: RootState) => state.offerPage.isOfferLoading;
export const selectIsReviewSubmitting = (state: RootState) => state.offerPage.isReviewSubmitting;

export const selectFavoriteOffers = createSelector([selectOffers], (offers) =>
  offers.filter((offer) => offer.isFavorite)
);

export const selectFavoriteOffersCount = createSelector([selectFavoriteOffers], (favoriteOffers) =>
  favoriteOffers.length
);

export const selectOffersByCity = createSelector(
  [selectOffers, (_state: RootState, city: CityName) => city],
  (offers, city) => offers.filter((offer) => offer.city === city)
);

export const selectOffersByActiveCity = createSelector(
  [selectOffers, selectActiveCity],
  (offers, activeCity) => offers.filter((offer) => offer.city === activeCity)
);

export const selectGroupedFavoriteOffers = createSelector([selectFavoriteOffers], (favoriteOffers) =>
  favoriteOffers.reduce<Record<CityName, Offer[]>>((groupedOffers, offer) => {
    const cityOffers = groupedOffers[offer.city] ?? [];
    cityOffers.push(offer);
    groupedOffers[offer.city] = cityOffers;

    return groupedOffers;
  }, {} as Record<CityName, Offer[]>)
);
