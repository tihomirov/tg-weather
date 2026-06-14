import type { FC } from 'react';
import styles from './CurrentWeather.module.scss';

export const CurrentWeatherLoading: FC = () => {
  return (
    <section className={styles.currentWeather}>
      <p className={styles.message}>Loading current weather...</p>
    </section>
  );
};

export const CurrentWeatherError: FC = () => {
  return (
    <section className={styles.currentWeather}>
      <p className={styles.error}>Failed to load current weather.</p>
    </section>
  );
};
