import { memo, useCallback } from 'react';
import { cities } from '../../const';
import type { CityName } from '../../types/offer';

type CitiesListProps = {
  activeCity: CityName;
  onCityClick: (city: CityName) => void;
};

type CityItemProps = {
  city: CityName;
  isActive: boolean;
  onCityClick: (city: CityName) => void;
};

const CityItem = memo(({ city, isActive, onCityClick }: CityItemProps): JSX.Element => {
  const handleClick = useCallback(() => {
    onCityClick(city);
  }, [city, onCityClick]);

  return (
    <li className="locations__item">
      <button
        className={`locations__item-link tabs__item button ${isActive ? 'tabs__item--active' : ''}`}
        type="button"
        onClick={handleClick}
      >
        <span>{city}</span>
      </button>
    </li>
  );
});
CityItem.displayName = 'CityItem';

function CitiesList({ activeCity, onCityClick }: CitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <CityItem
            key={city}
            city={city}
            isActive={activeCity === city}
            onCityClick={onCityClick}
          />
        ))}
      </ul>
    </section>
  );
}

const MemoizedCitiesList = memo(CitiesList);
MemoizedCitiesList.displayName = 'CitiesList';

export default MemoizedCitiesList;
