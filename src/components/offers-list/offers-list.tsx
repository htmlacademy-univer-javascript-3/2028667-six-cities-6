import OfferCard from '../offer-card/offer-card';
import type { Offer } from '../../mocks/offers';

type OffersListProps = {
  offers: Offer[];
  onToggleFavorite: (offerId: string) => void;
  onOfferHover: (offerId: string | null) => void;
};

function OffersList({
  offers,
  onToggleFavorite,
  onOfferHover,
}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onToggleFavorite={onToggleFavorite}
          onOfferHover={onOfferHover}
        />
      ))}
    </div>
  );
}

export default OffersList;
