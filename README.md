# TG Weather

React application that shows the current weather for a selected city.
(React + TypeScript + Vite template was used to create this app).

## How to run

1. Clone this project.
2. Go to the project directory. 
3. Switch to the Node.js version specified in this project's(see .nvmrc). You can do this by running `nvm use` command.
4. Install dependencies. Run `npm install`.
5. Start dev mode. Run `npm run dev`(or `npm run build` and then `npm run preview` to locally preview the production build).

By default [open-meteo](https://open-meteo.com/en/docs) API is used. It does not required any API keys.
You can provide VITE_WEATHER_API_KEY env variable to use [WeatherAPI](https://www.weatherapi.com/docs/) as a fallback.
To do this just create a .env.local file and add VITE_WEATHER_API_KEY there:
```
VITE_WEATHER_API_KEY=xxxxxxxxx
```

If VITE_WEATHER_API_KEY provided [WeatherAPI](https://www.weatherapi.com/docs/) will be used if main provider is unavailable.
You can change priority of providers by reordering it in `createWeatherFacade` function:
```typescript
export const weatherService = createWeatherFacade(
  [
    createOpenMeteoProvider(), // main provider
    WEATHER_API_KEY && createWeatherApiProvider({ // fallback provider if API key is added
      apiKey: WEATHER_API_KEY,
    }),
  ].filter(Boolean),
);
```
