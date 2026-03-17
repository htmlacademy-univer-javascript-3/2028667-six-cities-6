import { useState } from 'react';
import OfferCard from '../../components/offer-card/offer-card';

type MainPageProps = {
  offersCount: number;
};

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

const sortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

type CityName = (typeof cities)[number];
type SortingOption = (typeof sortingOptions)[number];

type Offer = {
  id: string;
  city: CityName;
  title: string;
  type: string;
  price: number;
  rating: number;
  imageUrl: string;
  isPremium: boolean;
  isFavorite: boolean;
};

const initialOffers: Offer[] = [
  {
    id: 'offer-1',
    city: 'Amsterdam',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    rating: 4.8,
    imageUrl: 'img/apartment-01.jpg',
    isPremium: true,
    isFavorite: false,
  },
  {
    id: 'offer-2',
    city: 'Amsterdam',
    title: 'Wood and stone place',
    type: 'Private room',
    price: 80,
    rating: 4.2,
    imageUrl: 'img/room.jpg',
    isPremium: false,
    isFavorite: true,
  },
  {
    id: 'offer-3',
    city: 'Amsterdam',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4.7,
    imageUrl: 'img/apartment-02.jpg',
    isPremium: false,
    isFavorite: false,
  },
  {
    id: 'offer-4',
    city: 'Amsterdam',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5,
    imageUrl: 'img/apartment-03.jpg',
    isPremium: true,
    isFavorite: false,
  },
  {
    id: 'offer-5',
    city: 'Paris',
    title: 'Compact studio near the Seine',
    type: 'Studio',
    price: 110,
    rating: 4.1,
    imageUrl: 'img/studio-01.jpg',
    isPremium: false,
    isFavorite: true,
  },
  {
    id: 'offer-6',
    city: 'Cologne',
    title: 'Modern loft with skyline view',
    type: 'Loft',
    price: 150,
    rating: 4.9,
    imageUrl: 'img/apartment-01.jpg',
    isPremium: true,
    isFavorite: false,
  },
  {
    id: 'offer-7',
    city: 'Brussels',
    title: 'Quiet flat in the city center',
    type: 'Apartment',
    price: 98,
    rating: 3.9,
    imageUrl: 'img/apartment-02.jpg',
    isPremium: false,
    isFavorite: false,
  },
  {
    id: 'offer-8',
    city: 'Hamburg',
    title: 'Bright apartment by the river',
    type: 'Apartment',
    price: 140,
    rating: 4.5,
    imageUrl: 'img/apartment-03.jpg',
    isPremium: true,
    isFavorite: true,
  },
];

function MainPage({ offersCount }: MainPageProps): JSX.Element {
  const [activeCity, setActiveCity] = useState<CityName>('Amsterdam');
  const [activeSorting, setActiveSorting] = useState<SortingOption>('Popular');
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [offers, setOffers] = useState(initialOffers);

  const cityOffers = offers.filter((offer) => offer.city === activeCity);

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
    setActiveCity(city);
    setIsSortingOpen(false);
  };

  const handleSortingChange = (sortingOption: SortingOption) => {
    setActiveSorting(sortingOption);
    setIsSortingOpen(false);
  };

  const handleFavoriteToggle = (offerId: string) => {
    setOffers((currentOffers) =>
      currentOffers.map((offer) => (
        offer.id === offerId
          ? { ...offer, isFavorite: !offer.isFavorite }
          : offer
      ))
    );
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
                      {offers.filter((offer) => offer.isFavorite).length}
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
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li className="locations__item" key={city}>
                  <button
                    className={`locations__item-link tabs__item button ${activeCity === city ? 'tabs__item--active' : ''}`}
                    type="button"
                    onClick={() => handleCityClick(city)}
                  >
                    <span>{city}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {cityOffers.length > 0
                  ? `${cityOffers.length} places to stay in ${activeCity}`
                  : `${offersCount} places available soon in ${activeCity}`}
              </b>

              <form className="places__sorting" action="#" method="get" onSubmit={(event) => event.preventDefault()}>
                <span className="places__sorting-caption">Sort by</span>

                <button
                  className="places__sorting-type button"
                  type="button"
                  onClick={() => setIsSortingOpen((currentState) => !currentState)}
                >
                  {activeSorting}
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </button>

                <ul className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`}>
                  {sortingOptions.map((sortingOption) => (
                    <li
                      className={`places__option ${activeSorting === sortingOption ? 'places__option--active' : ''}`}
                      tabIndex={0}
                      key={sortingOption}
                      onClick={() => handleSortingChange(sortingOption)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          handleSortingChange(sortingOption);
                        }
                      }}
                    >
                      {sortingOption}
                    </li>
                  ))}
                </ul>
              </form>

              <div className="cities__places-list places__list tabs__content">
                {sortedOffers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    id={offer.id}
                    title={offer.title}
                    type={offer.type}
                    price={offer.price}
                    rating={offer.rating}
                    imageUrl={offer.imageUrl}
                    isPremium={offer.isPremium}
                    isFavorite={offer.isFavorite}
                    onToggleFavorite={handleFavoriteToggle}
                  />
                ))}
              </div>
            </section>

            <div className="cities__right-section">
              <section className="cities__map map" aria-label={`Map of places in ${activeCity}`}></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
