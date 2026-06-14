import type { FC } from 'react';
import type { City } from '../../entities/city/types';
import { Autocomplete } from '../../shared/components/autocomplete';
import { useCitySearch } from './useCitySearch';
import styles from './CitySearch.module.scss';

interface CitySearchProps {
  onSelectCity: (city: City) => void;
}

const formatCityDescription = (city: City): string => {
  return !city.region ? city.country : `${city.region}, ${city.country}`;
};

export const CitySearch: FC<CitySearchProps> = ({ onSelectCity }) => {
  const {
    query,
    cities,
    isLoading,
    error,
    setQuery,
    selectCity,
  } = useCitySearch();

  const handleSelectCity = (city: City) => {
    selectCity();
    onSelectCity(city);
  };

  return (
    <div className={styles.search}>
      <Autocomplete
        value={query}
        options={cities}
        isLoading={isLoading}
        error={error}
        onChange={setQuery}
        onSelect={handleSelectCity}
        getOptionLabel={(city) => city.name}
        getOptionDescription={formatCityDescription}
        label='Search city'
        placeholder='Enter city name'
        emptyMessage='No cities found.'
        loadingMessage='Searching cities...'
      />
    </div>
  );
};
