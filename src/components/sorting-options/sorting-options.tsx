import { memo, useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { sortingOptions } from './const';
import type { SortingOption } from './const';

type SortingOptionsProps = {
  activeSorting: SortingOption;
  isOpen: boolean;
  onSortingToggle: () => void;
  onSortingChange: (sortingOption: SortingOption) => void;
};

type SortingOptionItemProps = {
  activeSorting: SortingOption;
  sortingOption: SortingOption;
  onSortingChange: (sortingOption: SortingOption) => void;
};

const SortingOptionItem = memo(({
  activeSorting,
  sortingOption,
  onSortingChange,
}: SortingOptionItemProps): JSX.Element => {
  const handleClick = useCallback(() => {
    onSortingChange(sortingOption);
  }, [onSortingChange, sortingOption]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSortingChange(sortingOption);
    }
  }, [onSortingChange, sortingOption]);

  return (
    <li
      className={`places__option ${activeSorting === sortingOption ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {sortingOption}
    </li>
  );
});
SortingOptionItem.displayName = 'SortingOptionItem';

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
          <SortingOptionItem
            key={sortingOption}
            activeSorting={activeSorting}
            sortingOption={sortingOption}
            onSortingChange={onSortingChange}
          />
        ))}
      </ul>
    </form>
  );
}

const MemoizedSortingOptions = memo(SortingOptions);
MemoizedSortingOptions.displayName = 'SortingOptions';

export default MemoizedSortingOptions;
