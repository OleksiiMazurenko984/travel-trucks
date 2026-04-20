'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FiMap } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import css from './Filters.module.css';
import type {
  CamperCatalogFilters,
  CamperFiltersResponse,
} from '@/types/campers';

const FILTER_CATEGORIES = [
  { key: 'forms', paramKey: 'form', label: 'Camper form' },
  { key: 'engines', paramKey: 'engine', label: 'Engine' },
  { key: 'transmissions', paramKey: 'transmission', label: 'Transmission' },
] as const;

const formatOptionLabel = (value: string) => value.replaceAll('_', ' ');

interface FiltersProps {
  options: CamperFiltersResponse;
}

type FilterParamKey = keyof Pick<
  CamperCatalogFilters,
  'form' | 'engine' | 'transmission'
>;

export default function Filters({ options }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocation = searchParams.get('location') ?? '';
  const [locationInput, setLocationInput] = useState(currentLocation);

  useEffect(() => {
    setLocationInput(currentLocation);
  }, [currentLocation]);

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  const applySearchParams = (nextParams: URLSearchParams) => {
    const nextQuery = nextParams.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  };

  const updateSingleParam = (key: string, value?: string) => {
    const nextParams = new URLSearchParams(queryString);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    applySearchParams(nextParams);
  };

  const handleRadioChange = (key: FilterParamKey, value: string) => {
    updateSingleParam(key, value);
  };

  const handleSearchClick = () => {
    updateSingleParam('location', locationInput.trim() || undefined);
  };

  const handleClearFilters = () => {
    setLocationInput('');
    router.push(pathname);
  };

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
            value={locationInput}
            onChange={event => setLocationInput(event.target.value)}
          />
        </div>
      </div>

      <div className={css.filterSection}>
        <h2 className={css.filterTitle}>Filters</h2>

        {FILTER_CATEGORIES.map(({ key, paramKey, label }) => (
          <fieldset className={css.fieldset} key={key}>
            <legend className={css.legend}>{label}</legend>
            <div className={css.optionsList}>
              {options[key].map(option => (
                <label className={css.optionLabel} key={option}>
                  <input
                    className={css.radio}
                    type="radio"
                    name={paramKey}
                    value={option}
                    checked={searchParams.get(paramKey) === option}
                    onChange={() => handleRadioChange(paramKey, option)}
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
        <button
          className={css.searchButton}
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </button>
        <button
          className={css.clearButton}
          type="button"
          onClick={handleClearFilters}
        >
          <RxCross2 />
          Clear filters
        </button>
      </div>
    </aside>
  );
}
