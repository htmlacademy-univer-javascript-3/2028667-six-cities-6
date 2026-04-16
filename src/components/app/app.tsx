import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import { setOffersLoading } from '../../store/action';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import type { AppDispatch } from '../../store';
import { selectIsOffersLoading } from '../../store/selectors';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isOffersLoading = useSelector(selectIsOffersLoading);

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      dispatch(setOffersLoading(false));
    }, 10000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route
        path="/favorites"
        element={(
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        )}
      />
      <Route path="/offer/:id" element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
