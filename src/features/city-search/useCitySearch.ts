import { useEffect, useRef, useState } from 'react';
import type { City } from '../../entities/city/types';
import {
  weatherService,
} from '../../shared/api/weather';
import { SEARCH_CITY_QUERY_MIN_LENGTH } from '../../shared/api/weather/constants';
import { useDebouncedValue } from '../../shared/hooks';
import { isWeatherError } from '../../shared/api/weather/errors.ts';

const SEARCH_DEBOUNCE_MS = 350;

export const useCitySearch = () => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery.length < SEARCH_CITY_QUERY_MIN_LENGTH) {
      return;
    }

    const controller = new AbortController();
    activeRequestRef.current = controller;

    void weatherService.searchCity(trimmedQuery, { signal: controller.signal })
      .then((searchResults) => {
        setCities(searchResults);
      })
      .catch((caughtError: unknown) => {
        if (isWeatherError(caughtError) && caughtError.code === 'abort-request') {
          return;
        }
        setCities(null);
        setError('Failed to search cities.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  const changeQuery = (nextQuery: string) => {
    const trimmedQuery = nextQuery.trim();

    activeRequestRef.current?.abort();
    setQuery(nextQuery);
    setCities(null);
    setError(null);
    setIsLoading(trimmedQuery.length >= SEARCH_CITY_QUERY_MIN_LENGTH);
  };

  const selectCity = () => {
    activeRequestRef.current?.abort();
    setQuery('');
    setCities(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    query,
    cities,
    isLoading,
    error,
    setQuery: changeQuery,
    selectCity,
  };
};
