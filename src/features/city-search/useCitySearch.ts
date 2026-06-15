import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { City } from '../../entities/city/types';
import {
  weatherService,
} from '../../shared/api/weather';
import { SEARCH_CITY_QUERY_MIN_LENGTH } from '../../shared/api/weather/constants';
import { useDebouncedValue } from '../../shared/hooks';

const SEARCH_DEBOUNCE_MS = 350;

export const useCitySearch = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const trimmedQuery = debouncedQuery.trim();

  const citiesQuery = useQuery<City[]>({
    queryKey: ['cities', trimmedQuery],
    queryFn: ({ signal }) => weatherService.searchCity(trimmedQuery, { signal }),
    enabled: trimmedQuery.length >= SEARCH_CITY_QUERY_MIN_LENGTH,
  });

  return {
    query,
    cities: citiesQuery.data ?? null,
    isLoading: citiesQuery.isFetching,
    error: citiesQuery.isError ? 'Failed to search cities.' : null,
    setQuery: (value: string) => setQuery(value),
    selectCity: () => setQuery(''),
  };
};
