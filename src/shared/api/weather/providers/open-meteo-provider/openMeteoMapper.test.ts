import { describe, expect, it } from 'vitest';
import type {
  CurrentWeather,
  WeatherForecast,
} from '../../../../../entities/weather/types';
import {
  mapOpenMeteoCurrentWeather,
  mapOpenMeteoForecast,
} from './openMeteoMapper';
import { mapOpenMeteoWeatherIconUrl } from './openMeteoWeatherIconMapper';

describe('openMeteoMapper', () => {
  it('maps the whole current weather object without city metadata', () => {
    const weather = mapOpenMeteoCurrentWeather({
      timezone: 'Europe/London',
      current: {
        temperature_2m: 21.6,
        relative_humidity_2m: 58,
        apparent_temperature: 20.4,
        is_day: 1,
        weather_code: 0,
        wind_speed_10m: 14.7,
      },
    });

    expect(weather).toStrictEqual({
      temperatureCelsius: 21.6,
      condition: {
        text: 'Clear sky',
        iconUrl: mapOpenMeteoWeatherIconUrl(0, true),
      },
      feelsLikeCelsius: 20.4,
      humidityPercent: 58,
      windKph: 14.7,
    } satisfies CurrentWeather);
  });

  it('maps the whole forecast object without city metadata', () => {
    const forecast = mapOpenMeteoForecast({
      timezone: 'Europe/London',
      daily: {
        time: ['2026-06-14'],
        weather_code: [1],
        temperature_2m_max: [24.2],
        temperature_2m_min: [15.8],
      },
    });

    expect(forecast).toStrictEqual({
      days: [
        {
          date: '2026-06-14',
          condition: {
            text: 'Mainly clear',
            iconUrl: mapOpenMeteoWeatherIconUrl(1),
          },
          minTemperatureCelsius: 15.8,
          maxTemperatureCelsius: 24.2,
        },
      ],
    } satisfies WeatherForecast);
  });
});
