import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import type { AppDispatch } from '../../store';
import { fetchOfferPageDataAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import { toggleFavorite } from '../../store/action';
import {
  selectAuthorizationStatus,
  selectCurrentOffer,
  selectFavoriteOffersCount,
  selectIsOfferLoading,
  selectNearbyOffers,
  selectReviews,
} from '../../store/selectors';

function OfferPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const offer = useSelector(selectCurrentOffer);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const reviews = useSelector(selectReviews);
  const favoriteOffersCount = useSelector(selectFavoriteOffersCount);
  const isOfferLoading = useSelector(selectIsOfferLoading);
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferPageDataAction(id));
    }
  }, [dispatch, id]);

  const ratingWidth = offer ? `${Math.round(offer.rating) * 20}%` : '0%';
  const offerMapItems = useMemo(() => (offer ? [offer, ...nearbyOffers] : nearbyOffers), [offer, nearbyOffers]);

  const handleFavoriteToggle = useCallback((offerId: string) => {
    dispatch(toggleFavorite(offerId));
  }, [dispatch]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favoriteOffersCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={() => handleFavoriteToggle(offer.id)}
                  aria-pressed={offer.isFavorite}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'Remove from bookmarks' : 'Add to bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={offer.id} />}
              </section>
            </div>
          </div>
          <Map
            className="offer__map"
            city={offer.location}
            offers={offerMapItems}
            selectedOfferId={offer.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffers}
              className="near-places__list places__list"
              cardClassName="near-places__card"
              imageWrapperClassName="near-places__image-wrapper"
              onToggleFavorite={handleFavoriteToggle}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
