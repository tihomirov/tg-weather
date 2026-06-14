import { type FC } from 'react';
import type { City } from '../../entities/city/types';
import { useGetCityRegion } from '../../shared/hooks';
import type { CurrentWeatherProps } from './types.ts';
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherSummaryProps extends CurrentWeatherProps {
  city: City;
}

export const CurrentWeatherSummary: FC<CurrentWeatherSummaryProps> = ({ city, weather }) => {
  const getCityRegion = useGetCityRegion();

  return (
    <div className={styles.summary}>
      <div>
        <h2>{city.name}</h2>
        <p>{getCityRegion(city)}</p>
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
