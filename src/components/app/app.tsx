import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import { fillOffers, setOffersLoading } from '../../store/action';
import { fetchOffersAction } from '../../store/api-actions';
import type { AppDispatch, RootState } from '../../store';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = false;
  const offers = useSelector((state: RootState) => state.offers);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      dispatch(setOffersLoading(false));
    }, 10000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [dispatch]);

  const handleFavoriteToggle = (offerId: string) => {
    dispatch(fillOffers(offers.map((offer) => (
      offer.id === offerId
        ? { ...offer, isFavorite: !offer.isFavorite }
        : offer
    ))));
  };

  if (isOffersLoading && offers.length === 0) {
    return <Spinner />;
  }

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
