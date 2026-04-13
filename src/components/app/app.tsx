import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import type { Offer } from '../../mocks/offers';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: Offer[];
};

function App({ offers: initialOffers }: AppProps): JSX.Element {
  const isAuthorized = false;
  const [offers, setOffers] = useState(initialOffers);

  const handleFavoriteToggle = (offerId: string) => {
    setOffers((currentOffers) => currentOffers.map((offer) => (
      offer.id === offerId
        ? { ...offer, isFavorite: !offer.isFavorite }
        : offer
    )));
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage onToggleFavorite={handleFavoriteToggle} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/favorites"
        element={(
          <PrivateRoute isAuthorized={isAuthorized}>
            <FavoritesPage offers={offers} onToggleFavorite={handleFavoriteToggle} />
          </PrivateRoute>
        )}
      />
      <Route path="/offer/:id" element={<OfferPage offers={offers} onToggleFavorite={handleFavoriteToggle} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
