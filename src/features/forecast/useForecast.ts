import { useQuery } from '@tanstack/react-query';
import type { City } from '../../entities/city/types';
import { weatherService } from '../../shared/api/weather';

const FORECAST_STALE_TIME_MS = 30 * 60 * 1000;

export const useForecast = (city: City) => {
  return useQuery({
    queryKey: ['weather', 'forecast', city.id, city.latitude, city.longitude],
    queryFn: ({ signal }) => weatherService.getForecast(city, { signal }),
    staleTime: FORECAST_STALE_TIME_MS,
  });
};
