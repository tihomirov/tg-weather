import { createOpenMeteoProvider } from './providers/open-meteo-provider/openMeteoProvider';
import { createWeatherApiProvider } from './providers/weather-api-provider/weatherApiProvider';
import { createWeatherFacade } from './weatherFacade';

export const weatherService = createWeatherFacade(
  [
    createOpenMeteoProvider(), // main provider
    createWeatherApiProvider({ // fallback provider
      apiKey: import.meta.env.VITE_WEATHER_API_KEY,
    }),
  ],
);
