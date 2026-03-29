import { Link } from 'react-router-dom';
import type { Offer } from '../../mocks/offers';

type OfferCardProps = {
  offer: Offer;
  cardClassName?: string;
  imageWrapperClassName?: string;
  onToggleFavorite?: (offerId: string) => void;
  onOfferHover?: (offerId: string | null) => void;
};

function OfferCard({
  offer,
  cardClassName = 'cities__card',
  imageWrapperClassName = 'cities__image-wrapper',
  onToggleFavorite,
  onOfferHover,
}: OfferCardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    rating,
    imageUrl,
    isPremium,
    isFavorite,
  } = offer;

  const ratingWidth = `${Math.round(rating) * 20}%`;

  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseEnter={() => onOfferHover?.(id)}
      onMouseLeave={() => onOfferHover?.(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={imageUrl}
            width={260}
            height={200}
            alt={title}
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>

          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={() => onToggleFavorite?.(id)}
            aria-pressed={isFavorite}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'Remove from bookmarks' : 'Add to bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
