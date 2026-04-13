import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cityLocations } from '../../const';
import CitiesList from '../../components/cities-list/cities-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import type { SortingOption } from '../../components/sorting-options/sorting-options';
import { changeCity } from '../../store/action';
import type { AppDispatch, RootState } from '../../store';
import type { CityName } from '../../types/offer';

type MainPageProps = {
  onToggleFavorite: (offerId: string) => void;
};

function MainPage({ onToggleFavorite }: MainPageProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const activeCity = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  const [activeSorting, setActiveSorting] = useState<SortingOption>('Popular');
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const cityOffers = allOffers.filter((offer) => offer.city === activeCity);

  const sortedOffers = [...cityOffers].sort((firstOffer, secondOffer) => {
    switch (activeSorting) {
      case 'Price: low to high':
        return firstOffer.price - secondOffer.price;
      case 'Price: high to low':
        return secondOffer.price - firstOffer.price;
      case 'Top rated first':
        return secondOffer.rating - firstOffer.rating;
      case 'Popular':
      default:
        return 0;
    }
  });

  const handleCityClick = (city: CityName) => {
    dispatch(changeCity(city));
    setIsSortingOpen(false);
  };

  const handleSortingChange = (sortingOption: SortingOption) => {
    setActiveSorting(sortingOption);
    setIsSortingOpen(false);
  };

  const handleOfferHover = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };

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
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/" onClick={(event) => event.preventDefault()}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">
                      {allOffers.filter((offer) => offer.isFavorite).length}
                    </span>
                  </a>
                </li>

                <li className="header__nav-item">
                  <a className="header__nav-link" href="/" onClick={(event) => event.preventDefault()}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <CitiesList activeCity={activeCity} onCityClick={handleCityClick} />
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {cityOffers.length > 0
                  ? `${cityOffers.length} places to stay in ${activeCity}`
                  : `${allOffers.length} places available soon in ${activeCity}`}
              </b>

              <SortingOptions
                activeSorting={activeSorting}
                isOpen={isSortingOpen}
                onSortingToggle={() => setIsSortingOpen((currentState) => !currentState)}
                onSortingChange={handleSortingChange}
              />

              <OffersList
                offers={sortedOffers}
                onToggleFavorite={onToggleFavorite}
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
      </main>
    </div>
  );
}

export default MainPage;
