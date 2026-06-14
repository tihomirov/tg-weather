import { type FC, } from 'react';
import { formatTemperature } from './formatTemperature';
import type { CurrentWeatherProps } from './types.ts';
import styles from './CurrentWeather.module.scss';

export const CurrentWeatherCondition: FC<CurrentWeatherProps> = ({ weather }) =>  (
  <div className={styles.condition}>
    <h3>{formatTemperature(weather.temperatureCelsius)}</h3>
    <span>{weather.condition.text}</span>
  </div>
);
