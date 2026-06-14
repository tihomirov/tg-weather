import type { City } from '../../../../../entities/city/types';
import type {
  CurrentWeather,
  WeatherForecast,
} from '../../../../../entities/weather/types';
import { createUrl, fetchJson } from '../../http';
import type {
  WeatherProvider,
} from '../../types';
import {
  mapOpenMeteoCities,
  mapOpenMeteoCurrentWeather,
  mapOpenMeteoForecast,
} from './openMeteoMapper';
import { SEARCH_CITY_QUERY_MIN_LENGTH, WEATHER_API_FORECAST_DAYS } from '../../constants.ts';

const PROVIDER = 'open-meteo';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

const currentFields = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'weather_code',
  'wind_speed_10m',
].join(',');

const dailyFields = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
].join(',');

export const createOpenMeteoProvider = (): WeatherProvider => {
  return {
    name: PROVIDER,
    searchCity: async(query: string, options): Promise<City[]> => {
      const trimmedQuery = query.trim();

      if (trimmedQuery.length < SEARCH_CITY_QUERY_MIN_LENGTH) {
        return [];
      }

      const url = createUrl(GEOCODING_URL, {
        name: trimmedQuery,
        count: 10,
        language: 'en',
        format: 'json',
      });
      const payload = await fetchJson(url, {
        provider: PROVIDER,
        signal: options?.signal,
      });

      return mapOpenMeteoCities(payload);
    },
    getCurrentWeather: async(location: City): Promise<CurrentWeather> => {
      const url = createUrl(FORECAST_URL, {
        latitude: location.latitude,
        longitude: location.longitude,
        current: currentFields,
        timezone: 'auto',
      });
      const payload = await fetchJson(url, {
        provider: PROVIDER,
      });

      return mapOpenMeteoCurrentWeather(payload, location);
    },
    getForecast: async(location: City): Promise<WeatherForecast> => {
      const url = createUrl(FORECAST_URL, {
        latitude: location.latitude,
        longitude: location.longitude,
        daily: dailyFields,
        timezone: 'auto',
        forecast_days: WEATHER_API_FORECAST_DAYS,
      });
      const payload = await fetchJson(url, {
        provider: PROVIDER,
      });

      return mapOpenMeteoForecast(payload, location);
    },
  };
};
