import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationStatus, cityLocations } from '../../const';
import CitiesList from '../../components/cities-list/cities-list';
import MainEmpty from '../../components/main-empty/main-empty';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import type { SortingOption } from '../../components/sorting-options/const';
import { changeCity, requireAuthorization } from '../../store/action';
import type { AppDispatch } from '../../store';
import { updateFavoriteStatusAction } from '../../store/api-actions';
import { selectActiveCity, selectAuthorizationStatus, selectFavoriteOffersCount, selectOffersByActiveCity } from '../../store/selectors';
import type { CityName } from '../../types/offer';

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const activeCity = useSelector(selectActiveCity);
  const cityOffers = useSelector(selectOffersByActiveCity);
  const favoriteOffersCount = useSelector(selectFavoriteOffersCount);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const [activeSorting, setActiveSorting] = useState<SortingOption>('Popular');
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const sortedOffers = useMemo(() => {
    const offersToSort = [...cityOffers];

    switch (activeSorting) {
      case 'Price: low to high':
        return offersToSort.sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
      case 'Price: high to low':
        return offersToSort.sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
      case 'Top rated first':
        return offersToSort.sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
      case 'Popular':
      default:
        return offersToSort;
    }
  }, [cityOffers, activeSorting]);

  const handleCityClick = useCallback((city: CityName) => {
    dispatch(changeCity(city));
    setIsSortingOpen(false);
  }, [dispatch]);

  const handleSortingChange = useCallback((sortingOption: SortingOption) => {
    setActiveSorting(sortingOption);
    setIsSortingOpen(false);
  }, []);

  const handleOfferHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  const handleSortingToggle = useCallback(() => {
    setIsSortingOpen((currentState) => !currentState);
  }, []);

  const handleFavoriteToggle = useCallback((offerId: string) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    const offer = sortedOffers.find((item) => item.id === offerId);

    if (!offer) {
      return;
    }

    void dispatch(updateFavoriteStatusAction(offerId, offer.isFavorite));
  }, [authorizationStatus, dispatch, navigate, sortedOffers]);

  const handleSignOut = useCallback(() => {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }, [dispatch]);

  const hasOffers = cityOffers.length > 0;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/" onClick={(event) => event.preventDefault()}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>

            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                        <span className="header__favorite-count">
                          {favoriteOffersCount}
                        </span>
                      </Link>
                    </li>

                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/login" onClick={handleSignOut}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${hasOffers ? '' : 'page__main--index-empty'}`.trim()}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <CitiesList activeCity={activeCity} onCityClick={handleCityClick} />
        </div>

        {hasOffers ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>

                <b className="places__found">
                  {cityOffers.length} places to stay in {activeCity}
                </b>

                <SortingOptions
                  activeSorting={activeSorting}
                  isOpen={isSortingOpen}
                  onSortingToggle={handleSortingToggle}
                  onSortingChange={handleSortingChange}
                />

                <OffersList
                  offers={sortedOffers}
                  onToggleFavorite={handleFavoriteToggle}
                  onOfferHover={handleOfferHover}
                />
              </section>

              <div className="cities__right-section">
                <Map
                  className="cities__map map"
                  city={cityLocations[activeCity]}
                  offers={sortedOffers}
                  selectedOfferId={activeOfferId ?? undefined}
                />
              </div>
            </div>
          </div>
        ) : (
          <MainEmpty cityName={activeCity} />
        )}
      </main>
    </div>
  );
}

export default MainPage;
