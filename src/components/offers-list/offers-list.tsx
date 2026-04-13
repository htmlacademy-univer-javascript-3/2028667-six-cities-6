import OfferCard from '../offer-card/offer-card';
import type { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
  onToggleFavorite?: (offerId: string) => void;
  onOfferHover?: (offerId: string | null) => void;
};

function OffersList({
  offers,
  className = 'cities__places-list places__list tabs__content',
  cardClassName,
  imageWrapperClassName,
  onToggleFavorite,
  onOfferHover,
}: OffersListProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardClassName={cardClassName}
          imageWrapperClassName={imageWrapperClassName}
          onToggleFavorite={onToggleFavorite}
          onOfferHover={onOfferHover}
        />
      ))}
    </div>
  );
}

export default OffersList;
