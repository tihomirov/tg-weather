import { type FC, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { City } from '../../entities/city/types';
import { weatherService } from '../../shared/api/weather';
import { ForecastContent } from './ForecastContent';
import { ForecastError, ForecastLoading } from './ForecastStates';

interface ForecastProps {
  city: City;
}

export const Forecast: FC<ForecastProps> = ({ city }) => {
  const forecastPromise = useMemo(() => weatherService.getForecast(city), [city]);

  return (
    <ErrorBoundary fallback={<ForecastError />}>
      <Suspense fallback={<ForecastLoading />}>
        <ForecastContent city={city} forecastPromise={forecastPromise} />
      </Suspense>
    </ErrorBoundary>
  );
};
