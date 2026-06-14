import type { City } from '../../../entities/city/types';
import type {
  CurrentWeather,
  WeatherForecast,
} from '../../../entities/weather/types';

export type WeatherProviderName = 'open-meteo' | 'weather-api';

export interface WeatherRequestOptions {
  signal?: AbortSignal;
}

export interface WeatherService {
  searchCity(query: string, options?: WeatherRequestOptions): Promise<City[]>;
  getCurrentWeather(city: City, options?: WeatherRequestOptions): Promise<CurrentWeather>;
  getForecast(city: City): Promise<WeatherForecast>;
}

export interface WeatherProvider extends WeatherService {
  readonly name: WeatherProviderName;
}
