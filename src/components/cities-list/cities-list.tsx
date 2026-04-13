import { cities } from '../../mocks/offers';
import type { CityName } from '../../mocks/offers';

type CitiesListProps = {
  activeCity: CityName;
  onCityClick: (city: CityName) => void;
};

function CitiesList({ activeCity, onCityClick }: CitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <button
              className={`locations__item-link tabs__item button ${activeCity === city ? 'tabs__item--active' : ''}`}
              type="button"
              onClick={() => onCityClick(city)}
            >
              <span>{city}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
