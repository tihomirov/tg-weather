import { use, type FC } from 'react';
import type { City } from '../../entities/city/types';
import type { WeatherForecast } from '../../entities/weather/types';
import { ForecastContentItem } from './ForecastContentItem';
import styles from './Forecast.module.scss';

interface ForecastContentProps {
  city: City;
  forecastPromise: Promise<WeatherForecast>;
}

export const ForecastContent: FC<ForecastContentProps> = ({
  city,
  forecastPromise,
}) => {
  const forecast = use(forecastPromise);

  return (
    <section className={styles.forecast}>
      <div className={styles.summary}>
        <h2>{city.name} forecast</h2>
      </div>

      <div className={styles.days}>
        {forecast.days.map(day => (
          <ForecastContentItem
            key={day.date}
            day={day}
          />
        ))}
      </div>
    </section>
  );
};
