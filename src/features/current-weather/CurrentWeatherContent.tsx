import { use, type FC } from 'react';
import type { City } from '../../entities/city/types';
import type { CurrentWeather as CurrentWeatherEntity } from '../../entities/weather/types';
import { CurrentWeatherSummary } from './CurrentWeatherSummary.tsx';
import { CurrentWeatherCondition } from './CurrentWeatherCondition.tsx';
import { CurrentWeatherMetrics } from './CurrentWeatherMetrics.tsx';
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherContentProps {
  city: City;
  weatherPromise: Promise<CurrentWeatherEntity>;
}

export const CurrentWeatherContent: FC<CurrentWeatherContentProps> = ({
  city,
  weatherPromise,
}) => {
  const weather = use(weatherPromise);

  return (
    <section className={styles.currentWeather}>
      <CurrentWeatherSummary city={city} weather={weather} />
      <CurrentWeatherCondition weather={weather} />
      <CurrentWeatherMetrics weather={weather} />
    </section>

  );
};
