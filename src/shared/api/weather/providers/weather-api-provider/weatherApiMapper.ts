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

const mapWeatherApiLocation = (payload: unknown, fallbackLocation?: City): City => {
  const location = requireRecord(payload, PROVIDER, 'location');
  const name = requireString(location.name, PROVIDER, 'city name');
  const latitude = requireNumber(location.lat, PROVIDER, 'city latitude');
  const longitude = requireNumber(location.lon, PROVIDER, 'city longitude');

  return {
    id: fallbackLocation?.id ?? optionalNumber(location.id)?.toString() ?? `${name}-${latitude}-${longitude}`,
    name,
    latitude,
    longitude,
    country: optionalString(location.country) ?? fallbackLocation?.country ?? 'Unknown country',
    region: optionalString(location.region) ?? fallbackLocation?.region,
    countryCode: fallbackLocation?.countryCode,
    timezone: optionalString(location.tz_id) ?? fallbackLocation?.timezone,
  };
};

export const mapWeatherApiCities = (payload: unknown): City[] => {
  return requireArray(payload, PROVIDER, 'search results').map((result) => {
    return mapWeatherApiLocation(result);
  });
};

export const mapWeatherApiCurrentWeather = (
  payload: unknown,
  fallbackLocation: City,
): CurrentWeather => {
  const root = requireRecord(payload, PROVIDER, 'current weather response');
  const current = requireRecord(root.current, PROVIDER, 'current weather');
  const location = mapWeatherApiLocation(root.location, fallbackLocation);

  return {
    city: location,
    temperatureCelsius: requireNumber(current.temp_c, PROVIDER, 'temperature'),
    condition: mapWeatherApiCondition(current.condition),
    feelsLikeCelsius: optionalNumber(current.feelslike_c),
    humidityPercent: optionalNumber(current.humidity),
    windKph: optionalNumber(current.wind_kph),
  };
};

export const mapWeatherApiForecast = (
  payload: unknown,
  fallbackLocation: City,
): WeatherForecast => {
  const root = requireRecord(payload, PROVIDER, 'forecast response');
  const forecast = requireRecord(root.forecast, PROVIDER, 'forecast');
  const forecastDays = requireArray(forecast.forecastday, PROVIDER, 'forecast days');
  const location = mapWeatherApiLocation(root.location, fallbackLocation);

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
    location,
    days,
  };
};
