import type { City } from '../../../entities/city/types';
import type {
  CurrentWeather,
  WeatherForecast,
} from '../../../entities/weather/types';

export type WeatherProviderName = 'open-meteo' | 'weather-api';

export interface WeatherService {
  searchCity(query: string): Promise<City[]>;
  getCurrentWeather(location: City): Promise<CurrentWeather>;
  getForecast(location: City): Promise<WeatherForecast>;
}

export interface WeatherProvider extends WeatherService {
  readonly name: WeatherProviderName;
}
