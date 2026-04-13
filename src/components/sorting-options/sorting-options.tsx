export const sortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

export type SortingOption = (typeof sortingOptions)[number];

type SortingOptionsProps = {
  activeSorting: SortingOption;
  isOpen: boolean;
  onSortingToggle: () => void;
  onSortingChange: (sortingOption: SortingOption) => void;
};

function SortingOptions({
  activeSorting,
  isOpen,
  onSortingToggle,
  onSortingChange,
}: SortingOptionsProps): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get" onSubmit={(event) => event.preventDefault()}>
      <span className="places__sorting-caption">Sort by</span>

      <button
        className="places__sorting-type button"
        type="button"
        onClick={onSortingToggle}
      >
        {activeSorting}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </button>

      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortingOptions.map((sortingOption) => (
          <li
            className={`places__option ${activeSorting === sortingOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={sortingOption}
            onClick={() => onSortingChange(sortingOption)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSortingChange(sortingOption);
              }
            }}
          >
            {sortingOption}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
