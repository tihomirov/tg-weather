import {
  allowsWeatherFallback,
  WeatherUnavailableError,
  type WeatherProviderFailure,
} from './errors';
import type {
  WeatherRequestOptions,
  WeatherProvider,
  WeatherService,
} from './types';

export const createWeatherFacade = (
  providers: WeatherProvider[],
): WeatherService => {

  const executeWithFallback = async <T>(
    request: (provider: WeatherProvider) => Promise<T>,
  ): Promise<T> => {
    const failures: WeatherProviderFailure[] = [];

    for (const provider of providers) {
      try {
        return await request(provider);
      } catch(error) {
        if (!allowsWeatherFallback(error)) {
          throw error;
        }

        failures.push({
          provider: provider.name,
          error,
        });
      }
    }

    throw new WeatherUnavailableError(failures);
  };

  return {
    searchCity: (query, options?: WeatherRequestOptions) => {
      return executeWithFallback(
        (provider) => provider.searchCity(query, options),
      );
    },
    getCurrentWeather: (location, options?: WeatherRequestOptions) => {
      return executeWithFallback(
        (provider) => provider.getCurrentWeather(location, options),
      );
    },
    getForecast: (location) => {
      return executeWithFallback(
        (provider) => provider.getForecast(location),
      );
    },
  };
};
