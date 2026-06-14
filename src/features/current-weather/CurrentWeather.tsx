import { type FC, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { City } from '../../entities/city/types';
import { weatherService } from '../../shared/api/weather';
import { CurrentWeatherContent } from './CurrentWeatherContent.tsx';
import { CurrentWeatherError, CurrentWeatherLoading } from './CurrentWeatherStates';

type CurrentWeatherProps = {
  city: City;
};

export const CurrentWeather: FC<CurrentWeatherProps> = ({ city }) => {
  const weatherPromise = useMemo(() => weatherService.getCurrentWeather(city), [city]);

  return (
    <ErrorBoundary fallback={<CurrentWeatherError />}>
      <Suspense fallback={<CurrentWeatherLoading />}>
        <CurrentWeatherContent city={city} weatherPromise={weatherPromise} />
      </Suspense>
    </ErrorBoundary>
  );
};
