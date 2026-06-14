import type { City } from '../../entities/city/types.ts';
import { useCallback } from 'react';

export const useGetCityRegion = (
) => {
  return useCallback(
    (city: City) => !city.region ? city.country : `${city.region}, ${city.country}`, 
    [],
  );
};
