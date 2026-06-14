import { type FC, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { City } from '../../entities/city/types';
import { CurrentWeatherError, CurrentWeatherLoading } from './CurrentWeatherStates';
import { CurrentWeatherContent } from './CurrentWeatherContent.tsx';
import { weatherService } from '../../shared/api/weather';

interface CityCurrentWeather {
  city: City;
}

export const CityCurrentWeather: FC<CityCurrentWeather> = ({
  city,
}) => {
  const weatherPromise = useMemo(() => weatherService.getCurrentWeather(city), [city]);

  return (
    <ErrorBoundary
      key={city.id}
      fallback={<CurrentWeatherError />}
    >
      <Suspense fallback={<CurrentWeatherLoading />}>
        <CurrentWeatherContent city={city} weatherPromise={weatherPromise} />
      </Suspense>
    </ErrorBoundary>
  );
};
