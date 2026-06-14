import type { FC } from 'react';
import type { DailyWeatherForecast } from '../../entities/weather/types';
import { formatTemperature } from '../current-weather/formatTemperature';
import styles from './Forecast.module.scss';

interface ForecastContentItemProps {
  day: DailyWeatherForecast;
}

const formatForecastDate = (date: string): string => {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
};

export const ForecastContentItem: FC<ForecastContentItemProps> = ({ day }) => {
  return (
    <article className={styles.day}>
      <div className={styles.dayHeader}>
        <h3>{formatForecastDate(day.date)}</h3>
        {day.condition.iconUrl && (
          <img
            className={styles.conditionIcon}
            src={day.condition.iconUrl}
            alt=''
          />
        )}
      </div>
      <p className={styles.condition}>{day.condition.text}</p>
      <div className={styles.temperatures}>
        <div>
          <h3>High</h3>
          <span>{formatTemperature(day.maxTemperatureCelsius)}</span>
        </div>
        <div>
          <h3>Low</h3>
          <span>{formatTemperature(day.minTemperatureCelsius)}</span>
        </div>
      </div>
    </article>
  );
};
