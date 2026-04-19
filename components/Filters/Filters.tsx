import { FiMap } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import css from './Filters.module.css';
import { getCamperFilters } from '@/lib/api';

const FILTER_CATEGORIES = [
  { key: 'forms', label: 'Camper form' },
  { key: 'engines', label: 'Engine' },
  { key: 'transmissions', label: 'Transmission' },
] as const;

const formatOptionLabel = (value: string) => value.replaceAll('_', ' ');

export default async function Filters() {
  const filters = await getCamperFilters();

  return (
    <aside className={css.panel}>
      <div className={css.locationGroup}>
        <label className={css.locationLabel} htmlFor="location">
          Location
        </label>

        <div className={css.locationInputWrap}>
          <FiMap className={css.locationIcon} />
          <input
            className={css.locationInput}
            id="location"
            name="location"
            type="text"
            placeholder="City"
          />
        </div>
      </div>

      <div className={css.filterSection}>
        <h2 className={css.filterTitle}>Filters</h2>

        {FILTER_CATEGORIES.map(({ key, label }) => (
          <fieldset className={css.fieldset} key={key}>
            <legend className={css.legend}>{label}</legend>
            <div className={css.optionsList}>
              {filters[key].map(option => (
                <label className={css.optionLabel} key={option}>
                  <input
                    className={css.radio}
                    type="radio"
                    name={key}
                    value={option}
                  />
                  <span className={css.optionText}>
                    {formatOptionLabel(option)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className={css.actions}>
        <button className={css.searchButton} type="button">
          Search
        </button>
        <button className={css.clearButton} type="button">
          <RxCross2 />
          Clear filters
        </button>
      </div>
    </aside>
  );
}
