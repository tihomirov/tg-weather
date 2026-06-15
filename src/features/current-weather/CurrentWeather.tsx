import { type FC } from 'react';
import type { City } from '../../entities/city/types';
import { CurrentWeatherError, CurrentWeatherLoading } from './CurrentWeatherStates';
import { useCurrentWeather } from './useCurrentWeather.ts';
import { CurrentWeatherSummary } from './CurrentWeatherSummary.tsx';
import { CurrentWeatherCondition } from './CurrentWeatherCondition.tsx';
import { CurrentWeatherMetrics } from './CurrentWeatherMetrics.tsx';
import styles from './CurrentWeather.module.scss';

type CurrentWeatherProps = {
  city: City;
};

export const CurrentWeather: FC<CurrentWeatherProps> = ({ city }) => {
  const weatherQuery = useCurrentWeather(city);

  if (weatherQuery.isLoading) {
    return <CurrentWeatherLoading />;
  }

  if (weatherQuery.isError || !weatherQuery.data) {
    return <CurrentWeatherError />;
  }

  return (
    <section className={styles.currentWeather}>
      <CurrentWeatherSummary city={city} weather={weatherQuery.data} />
      <CurrentWeatherCondition weather={weatherQuery.data} />
      <CurrentWeatherMetrics weather={weatherQuery.data} />
    </section>
  );
};
