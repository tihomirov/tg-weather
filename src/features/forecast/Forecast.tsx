import { type FC } from 'react';
import type { City } from '../../entities/city/types';
import { ForecastError, ForecastLoading } from './ForecastStates';
import { ForecastContentItem } from './ForecastContentItem.tsx';
import { useForecast } from './useForecast';
import styles from './Forecast.module.scss';

interface ForecastProps {
  city: City;
}

export const Forecast: FC<ForecastProps> = ({ city }) => {
  const forecastQuery = useForecast(city);

  if (forecastQuery.isLoading) {
    return <ForecastLoading />;
  }

  if (forecastQuery.isError || !forecastQuery.data) {
    return <ForecastError />;
  }

  return (
    <section className={styles.forecast}>
      <div className={styles.summary}>
        <h2>{city.name} forecast</h2>
      </div>

      <div className={styles.days}>
        {forecastQuery.data.days.map(day => (
          <ForecastContentItem
            key={day.date}
            day={day}
          />
        ))}
      </div>
    </section>
  );
};
