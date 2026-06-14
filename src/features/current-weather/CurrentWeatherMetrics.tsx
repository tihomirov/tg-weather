import { type FC } from 'react';
import { formatTemperature } from './formatTemperature';
import type { CurrentWeatherProps } from './types.ts';
import styles from './CurrentWeather.module.scss';

export const CurrentWeatherMetrics: FC<CurrentWeatherProps> = ({
  weather,
}) => (
  <div className={styles.metrics}>
    {weather.feelsLikeCelsius && (
      <div className={styles.metric}>
        <h3>Feels like</h3>
        <span>{formatTemperature(weather.feelsLikeCelsius)}</span>
      </div>
    )}
    {weather.humidityPercent && (
      <div className={styles.metric}>
        <h3>Humidity</h3>
        <span>{weather.humidityPercent}%</span>
      </div>
    )}
    {weather.windKph && (
      <div className={styles.metric}>
        <h3>Wind</h3>
        <span>{Math.round(weather.windKph)} km/h</span>
      </div>
    )}
  </div>
);
