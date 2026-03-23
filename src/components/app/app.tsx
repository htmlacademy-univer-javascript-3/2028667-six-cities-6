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

function App({ offers }: AppProps): JSX.Element {
  const isAuthorized = false;

  return (
    <Routes>
      <Route path="/" element={<MainPage offers={offers} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/favorites"
        element={(
          <PrivateRoute isAuthorized={isAuthorized}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        )}
      />
      <Route path="/offer/:id" element={<OfferPage offers={offers} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
