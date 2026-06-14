import type { City } from '../city/types';

export interface WeatherCondition {
  code: number;
  text: string;
  iconUrl?: string;
}

export interface CurrentWeather {
  city: City;
  condition: WeatherCondition;
  temperatureCelsius: number;
  feelsLikeCelsius?: number;
  humidityPercent?: number;
  windKph?: number;
}

export interface DailyWeatherForecast {
  date: string;
  condition: WeatherCondition;
  minTemperatureCelsius: number;
  maxTemperatureCelsius: number;
}

export interface WeatherForecast {
  location: City;
  days: DailyWeatherForecast[];
}
