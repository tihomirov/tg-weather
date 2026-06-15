import { createOpenMeteoProvider } from './providers/open-meteo-provider/openMeteoProvider';
import { createWeatherApiProvider } from './providers/weather-api-provider/weatherApiProvider';
import { createWeatherFacade } from './weatherFacade';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherService = createWeatherFacade(
  [
    createOpenMeteoProvider(), // main provider
    WEATHER_API_KEY && createWeatherApiProvider({ // fallback provider if API key is added
      apiKey: WEATHER_API_KEY,
    }),
  ].filter(Boolean),
);
