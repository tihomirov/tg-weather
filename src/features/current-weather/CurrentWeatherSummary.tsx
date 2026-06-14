import { type FC } from 'react';
import { useGetCityRegion } from '../../shared/hooks';
import type { CurrentWeatherProps } from './types.ts';
import styles from './CurrentWeather.module.scss';

export const CurrentWeatherSummary: FC<CurrentWeatherProps> = ({ weather }) => {
  const getCityRegion = useGetCityRegion();

  return (
    <div className={styles.summary}>
      <div>
        <h2>{weather.city.name}</h2>
        <p>{getCityRegion(weather.city)}</p>
      </div>
      {weather.condition.iconUrl && (
        <img
          className={styles.conditionIcon}
          src={weather.condition.iconUrl}
          alt=''
        />
      )}
    </div>
  );
};
