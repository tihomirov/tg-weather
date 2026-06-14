import type { City } from '../../../../../entities/city/types';
import type {
  CurrentWeather,
  DailyWeatherForecast,
  WeatherCondition,
  WeatherForecast,
} from '../../../../../entities/weather/types';
import {
  optionalNumber,
  optionalString,
  requireArray,
  requireNumber,
  requireRecord,
  requireString,
} from '../../guards';

const PROVIDER = 'weather-api';

const normalizeIconUrl = (iconUrl: string) =>
  iconUrl.startsWith('//') 
    ? `https:${iconUrl}`
    : iconUrl;

const mapWeatherApiCondition = (payload: unknown): WeatherCondition => {
  const condition = requireRecord(payload, PROVIDER, 'weather condition');

  return {
    code: requireNumber(condition.code, PROVIDER, 'condition code'),
    text: requireString(condition.text, PROVIDER, 'condition text'),
    iconUrl: normalizeIconUrl(requireString(condition.icon, PROVIDER, 'condition icon')),
  };
};

const mapWeatherApiCity = (payload: unknown): City => {
  const cityResult = requireRecord(payload, PROVIDER, 'city');
  const name = requireString(cityResult.name, PROVIDER, 'city name');
  const latitude = requireNumber(cityResult.lat, PROVIDER, 'city latitude');
  const longitude = requireNumber(cityResult.lon, PROVIDER, 'city longitude');

  return {
    id: optionalNumber(cityResult.id)?.toString() ?? `${name}-${latitude}-${longitude}`,
    name,
    latitude,
    longitude,
    country: optionalString(cityResult.country) ?? 'Unknown country',
    region: optionalString(cityResult.region),
    timezone: optionalString(cityResult.tz_id),
  };
};

export const mapWeatherApiCities = (payload: unknown): City[] => {
  return requireArray(payload, PROVIDER, 'search results').map((result) => {
    return mapWeatherApiCity(result);
  });
};

export const mapWeatherApiCurrentWeather = (
  payload: unknown,
): CurrentWeather => {
  const root = requireRecord(payload, PROVIDER, 'current weather response');
  const current = requireRecord(root.current, PROVIDER, 'current weather');

  return {
    temperatureCelsius: requireNumber(current.temp_c, PROVIDER, 'temperature'),
    condition: mapWeatherApiCondition(current.condition),
    feelsLikeCelsius: optionalNumber(current.feelslike_c),
    humidityPercent: optionalNumber(current.humidity),
    windKph: optionalNumber(current.wind_kph),
  };
};

export const mapWeatherApiForecast = (
  payload: unknown,
): WeatherForecast => {
  const root = requireRecord(payload, PROVIDER, 'forecast response');
  const forecast = requireRecord(root.forecast, PROVIDER, 'forecast');
  const forecastDays = requireArray(forecast.forecastday, PROVIDER, 'forecast days');

  const days: DailyWeatherForecast[] = forecastDays.map((forecastDay) => {
    const dayRoot = requireRecord(forecastDay, PROVIDER, 'forecast day');
    const day = requireRecord(dayRoot.day, PROVIDER, 'forecast day details');

    return {
      date: requireString(dayRoot.date, PROVIDER, 'forecast date'),
      condition: mapWeatherApiCondition(day.condition),
      minTemperatureCelsius: requireNumber(day.mintemp_c, PROVIDER, 'minimum temperature'),
      maxTemperatureCelsius: requireNumber(day.maxtemp_c, PROVIDER, 'maximum temperature'),
    };
  });

  return {
    days,
  };
};
