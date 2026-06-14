import type { FC } from 'react';
import styles from './Forecast.module.scss';

export const ForecastLoading: FC = () => {
  return (
    <section className={styles.forecast}>
      <p className={styles.message}>Loading forecast...</p>
    </section>
  );
};

export const ForecastError: FC = () => {
  return (
    <section className={styles.forecast}>
      <p className={styles.error}>Failed to load forecast.</p>
    </section>
  );
};
