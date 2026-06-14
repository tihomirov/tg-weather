import { describe, expect, it } from 'vitest';
import type {
  CurrentWeather,
  WeatherForecast,
} from '../../../../../entities/weather/types';
import {
  mapWeatherApiCurrentWeather,
  mapWeatherApiForecast,
} from './weatherApiMapper';

const responseCity = {
  id: 123,
  name: 'Kiev',
  country: 'Ukraine',
  region: 'Kyiv',
  lat: 50.45,
  lon: 30.52,
  tz_id: 'Europe/London',
};

describe('weatherApiMapper', () => {
  it('maps the whole current weather object without city metadata', () => {
    const weather = mapWeatherApiCurrentWeather({
      location: responseCity,
      current: {
        temp_c: 21.6,
        feelslike_c: 20.4,
        humidity: 58,
        wind_kph: 14.7,
        condition: {
          code: 1000,
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        },
      },
    });

    expect(weather).toStrictEqual({
      temperatureCelsius: 21.6,
      condition: {
        code: 1000,
        text: 'Sunny',
        iconUrl: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
      },
      feelsLikeCelsius: 20.4,
      humidityPercent: 58,
      windKph: 14.7,
    } satisfies CurrentWeather);
  });

  it('maps the whole forecast object without city metadata', () => {
    const forecast = mapWeatherApiForecast({
      location: responseCity,
      forecast: {
        forecastday: [
          {
            date: '2026-06-14',
            day: {
              mintemp_c: 15.8,
              maxtemp_c: 24.2,
              condition: {
                code: 1003,
                text: 'Partly cloudy',
                icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              },
            },
          },
        ],
      },
    });

    expect(forecast).toStrictEqual({
      days: [
        {
          date: '2026-06-14',
          condition: {
            code: 1003,
            text: 'Partly cloudy',
            iconUrl: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
          },
          minTemperatureCelsius: 15.8,
          maxTemperatureCelsius: 24.2,
        },
      ],
    } satisfies WeatherForecast);
  });
});
