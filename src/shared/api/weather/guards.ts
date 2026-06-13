import {
  isNumber,
  isRecord,
  isString,
  optionalNumber,
  optionalString,
} from '../../utils/type-guards';
import { WeatherInvalidResponseError } from './errors';
import type { WeatherProviderName } from './types';

export const requireRecord = (
  value: unknown,
  provider: WeatherProviderName,
  label: string,
): Record<string, unknown> => {
  if (!isRecord(value)) {
    throw new WeatherInvalidResponseError(`${provider} returned invalid ${label}.`, provider);
  }

  return value;
};

export const requireArray = (
  value: unknown,
  provider: WeatherProviderName,
  label: string,
): unknown[] => {
  if (!Array.isArray(value)) {
    throw new WeatherInvalidResponseError(`${provider} returned invalid ${label}.`, provider);
  }

  return value;
};

export const requireNumber = (
  value: unknown,
  provider: WeatherProviderName,
  label: string,
): number => {
  if (!isNumber(value)) {
    throw new WeatherInvalidResponseError(`${provider} returned invalid ${label}.`, provider);
  }

  return value;
};

export const requireString = (
  value: unknown,
  provider: WeatherProviderName,
  label: string,
): string => {
  if (!isString(value)) {
    throw new WeatherInvalidResponseError(`${provider} returned invalid ${label}.`, provider);
  }

  return value;
};

export {
  optionalNumber,
  optionalString,
};
