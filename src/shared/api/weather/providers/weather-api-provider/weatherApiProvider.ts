import type { City } from '../../../../../entities/city/types';
import type {
  CurrentWeather,
  WeatherForecast,
} from '../../../../../entities/weather/types';
import { createUrl, fetchJson } from '../../http';
import type { WeatherProvider } from '../../types';
import {
  mapWeatherApiCities,
  mapWeatherApiCurrentWeather,
  mapWeatherApiForecast,
} from './weatherApiMapper';
import { SEARCH_CITY_QUERY_MIN_LENGTH, WEATHER_API_FORECAST_DAYS } from '../../constants.ts';

const PROVIDER = 'weather-api';
const BASE_URL = 'https://api.weatherapi.com/v1';

interface WeatherApiProviderOptions {
  apiKey: string;
}

const createLocationQuery = (location: City): string => {
  return `${location.latitude},${location.longitude}`;
};

export const createWeatherApiProvider = (
  providerOptions: WeatherApiProviderOptions,
): WeatherProvider => {
  return {
    name: PROVIDER,
    searchCity: async(query: string, options): Promise<City[]> => {
      const trimmedQuery = query.trim();

      if (trimmedQuery.length < SEARCH_CITY_QUERY_MIN_LENGTH) {
        return [];
      }

      const url = createUrl(`${BASE_URL}/search.json`, {
        key: providerOptions.apiKey,
        q: trimmedQuery,
      });
      const payload = await fetchJson(url, {
        provider: PROVIDER,
        signal: options?.signal,
      });

      return mapWeatherApiCities(payload);
    },
    getCurrentWeather: async(location: City): Promise<CurrentWeather> => {
      const url = createUrl(`${BASE_URL}/current.json`, {
        key: providerOptions.apiKey,
        q: createLocationQuery(location),
        aqi: 'no',
      });
      const payload = await fetchJson(url, {
        provider: PROVIDER,
      });

      return mapWeatherApiCurrentWeather(payload, location);
    },
    getForecast: async(location: City): Promise<WeatherForecast> => {
      const url = createUrl(`${BASE_URL}/forecast.json`, {
        key: providerOptions.apiKey,
        q: createLocationQuery(location),
        days: WEATHER_API_FORECAST_DAYS,
        aqi: 'no',
        alerts: 'no',
      });
      const payload = await fetchJson(url, {
        provider: PROVIDER,
      });

      return mapWeatherApiForecast(payload, location);
    },
  };
};
