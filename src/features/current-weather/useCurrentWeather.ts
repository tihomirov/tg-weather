import { useQuery } from '@tanstack/react-query';
import type { City } from '../../entities/city/types';
import { weatherService } from '../../shared/api/weather';

export const useCurrentWeather = (city: City) => {
  return useQuery({
    queryKey: ['weather', 'current', city.id, city.latitude, city.longitude],
    queryFn: ({ signal }) => weatherService.getCurrentWeather(city, { signal }),
  });
};
