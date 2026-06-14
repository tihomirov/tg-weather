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
import { mapOpenMeteoWeatherIconUrl } from './openMeteoWeatherIconMapper';

const PROVIDER = 'open-meteo';

const wmoConditions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

const mapOpenMeteoCondition = (
  code: number,
  isDay = true,
): WeatherCondition => {
  return {
    code,
    text: wmoConditions[code] ?? 'Unknown conditions',
    iconUrl: mapOpenMeteoWeatherIconUrl(code, isDay),
  };
};

export const mapOpenMeteoCities = (payload: unknown): City[] => {
  const root = requireRecord(payload, PROVIDER, 'geocoding response');

  if (root.results === undefined) {
    return [];
  }

  return requireArray(root.results, PROVIDER, 'geocoding results').map((result) => {
    const cityResult = requireRecord(result, PROVIDER, 'geocoding result');
    const name = requireString(cityResult.name, PROVIDER, 'city name');
    const latitude = requireNumber(cityResult.latitude, PROVIDER, 'city latitude');
    const longitude = requireNumber(cityResult.longitude, PROVIDER, 'city longitude');
    const id = requireNumber(cityResult.id, PROVIDER, 'city id').toString();

    return {
      id,
      name,
      latitude,
      longitude,
      country: optionalString(cityResult.country) ?? optionalString(cityResult.country_code) ?? 'Unknown country',
      countryCode: optionalString(cityResult.country_code),
      region: optionalString(cityResult.admin1),
      timezone: optionalString(cityResult.timezone),
    };
  });
};

export const mapOpenMeteoCurrentWeather = (
  payload: unknown,
): CurrentWeather => {
  const root = requireRecord(payload, PROVIDER, 'current weather response');
  const current = requireRecord(root.current, PROVIDER, 'current weather');
  const weatherCode = requireNumber(current.weather_code, PROVIDER, 'weather code');
  const isDay = optionalNumber(current.is_day) !== 0;

  return {
    temperatureCelsius: requireNumber(current.temperature_2m, PROVIDER, 'temperature'),
    condition: mapOpenMeteoCondition(weatherCode, isDay),
    feelsLikeCelsius: optionalNumber(current.apparent_temperature),
    humidityPercent: optionalNumber(current.relative_humidity_2m),
    windKph: optionalNumber(current.wind_speed_10m),
  };
};

const readRequiredNumber = (
  values: unknown[],
  index: number,
  label: string,
): number => {
  return requireNumber(values[index], PROVIDER, label);
};

export const mapOpenMeteoForecast = (
  payload: unknown,
): WeatherForecast => {
  const root = requireRecord(payload, PROVIDER, 'forecast response');
  const daily = requireRecord(root.daily, PROVIDER, 'daily forecast');
  const dates = requireArray(daily.time, PROVIDER, 'forecast dates');
  const weatherCodes = requireArray(daily.weather_code, PROVIDER, 'weather codes');
  const maxTemperatures = requireArray(daily.temperature_2m_max, PROVIDER, 'maximum temperatures');
  const minTemperatures = requireArray(daily.temperature_2m_min, PROVIDER, 'minimum temperatures');

  const days: DailyWeatherForecast[] = dates.map((dateValue, index) => {
    const weatherCode = readRequiredNumber(weatherCodes, index, 'weather code');

    return {
      date: requireString(dateValue, PROVIDER, 'forecast date'),
      condition: mapOpenMeteoCondition(weatherCode),
      minTemperatureCelsius: readRequiredNumber(minTemperatures, index, 'minimum temperature'),
      maxTemperatureCelsius: readRequiredNumber(maxTemperatures, index, 'maximum temperature'),
    };
  });

  return {
    days,
  };
};
