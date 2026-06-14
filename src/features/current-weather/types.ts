import type { CurrentWeather as CurrentWeatherEntity } from '../../entities/weather/types.ts';

export interface CurrentWeatherProps {
  weather: CurrentWeatherEntity;
}
