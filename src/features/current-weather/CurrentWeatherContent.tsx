import { use, type FC } from 'react';
import type { CurrentWeather as CurrentWeatherEntity } from '../../entities/weather/types';
import { CurrentWeatherSummary } from './CurrentWeatherSummary.tsx';
import { CurrentWeatherCondition } from './CurrentWeatherCondition.tsx';
import { CurrentWeatherMetrics } from './CurrentWeatherMetrics.tsx';
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherContentProps {
  weatherPromise: Promise<CurrentWeatherEntity>;
}

export const CurrentWeatherContent: FC<CurrentWeatherContentProps> = ({
  weatherPromise,
}) => {
  const weather = use(weatherPromise);

  return (
    <section className={styles.currentWeather}>
      <CurrentWeatherSummary weather={weather} />
      <CurrentWeatherCondition weather={weather} />
      <CurrentWeatherMetrics weather={weather} />
    </section>

  );
};
