import {
  WeatherError,
  WeatherInvalidResponseError,
  WeatherRequestError,
} from './errors';
import type {
  WeatherProviderName,
} from './types';

interface FetchJsonOptions {
  provider: WeatherProviderName;
}

export const createUrl = (
  baseUrl: string,
  params: Record<string, string | number | boolean>,
): URL => {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url;
};

export const fetchJson = async(
  url: URL,
  options: FetchJsonOptions,
): Promise<unknown> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new WeatherRequestError(
        `${options.provider} request failed with HTTP ${response.status}.`,
        options.provider,
      );
    }

    return await response.json();
  } catch(error) {
    if (error instanceof WeatherError) {
      throw error;
    }

    if (error instanceof SyntaxError) {
      throw new WeatherInvalidResponseError(
        `${options.provider} returned invalid JSON.`,
        options.provider,
        error,
      );
    }

    throw new WeatherRequestError(
      `${options.provider} request failed.`,
      options.provider,
      error,
    );
  }
};
