import type { WeatherProviderName } from './types';

export type WeatherErrorCode =
  | 'abort-request'
  | 'configuration'
  | 'invalid-response'
  | 'not-found'
  | 'request-failed'
  | 'unavailable';

interface WeatherErrorOptions {
  code: WeatherErrorCode;
  message: string;
  provider?: WeatherProviderName;
  cause?: unknown;
  allowsFallback?: boolean;
}

export class WeatherError extends Error {
  readonly code: WeatherErrorCode;
  readonly provider?: WeatherProviderName;
  readonly allowsFallback: boolean;

  constructor(options: WeatherErrorOptions) {
    super(options.message);

    this.name = 'WeatherError';
    this.code = options.code;
    this.provider = options.provider;
    this.cause = options.cause;
    this.allowsFallback = options.allowsFallback ?? true;
  }
}

export class WeatherNotFoundError extends WeatherError {
  constructor(message: string, provider?: WeatherProviderName) {
    super({
      code: 'not-found',
      message,
      provider,
      allowsFallback: false,
    });

    this.name = 'WeatherNotFoundError';
  }
}

export class WeatherInvalidResponseError extends WeatherError {
  constructor(message: string, provider?: WeatherProviderName, cause?: unknown) {
    super({
      code: 'invalid-response',
      message,
      provider,
      cause,
    });

    this.name = 'WeatherInvalidResponseError';
  }
}

export class WeatherRequestError extends WeatherError {
  constructor(message: string, provider?: WeatherProviderName, cause?: unknown) {
    super({
      code: 'request-failed',
      message,
      provider,
      cause,
    });

    this.name = 'WeatherRequestError';
  }
}

export class WeatherAbortError extends WeatherError {
  constructor(message: string, provider?: WeatherProviderName, cause?: unknown) {
    super({
      code: 'abort-request',
      message,
      provider,
      cause,
      allowsFallback: false,
    });

    this.name = 'WeatherAbortError';
  }
}

export interface WeatherProviderFailure {
  provider: WeatherProviderName;
  error: unknown;
}

export class WeatherUnavailableError extends WeatherError {
  readonly failures: WeatherProviderFailure[];

  constructor(failures: WeatherProviderFailure[]) {
    super({
      code: 'unavailable',
      message: `Weather is unavailable from every provider.`,
      cause: failures,
      allowsFallback: false,
    });

    this.name = 'WeatherUnavailableError';
    this.failures = failures;
  }
}

export const isWeatherError = (error: unknown): error is WeatherError => {
  return error instanceof WeatherError;
};

export const allowsWeatherFallback = (error: unknown): boolean => {
  return !isWeatherError(error) || error.allowsFallback;
};
