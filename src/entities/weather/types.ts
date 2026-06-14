export interface WeatherCondition {
  text: string;
  iconUrl?: string;
}

export interface CurrentWeather {
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
  days: DailyWeatherForecast[];
}
