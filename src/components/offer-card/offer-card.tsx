type OfferCardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  rating: number;
  imageUrl: string;
  isPremium: boolean;
  isFavorite: boolean;
  onToggleFavorite: (offerId: string) => void;
};

function OfferCard({
  id,
  title,
  type,
  price,
  rating,
  imageUrl,
  isPremium,
  isFavorite,
  onToggleFavorite,
}: OfferCardProps): JSX.Element {
  const ratingWidth = `${Math.round(rating) * 20}%`;

  return (
    <article className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/" onClick={(event) => event.preventDefault()}>
          <img
            className="place-card__image"
            src={imageUrl}
            width={260}
            height={200}
            alt={title}
          />
        </a>
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
            onClick={() => onToggleFavorite(id)}
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
          <a href="/" onClick={(event) => event.preventDefault()}>{title}</a>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
