import clearDayIcon from '@meteocons/svg-static/fill/clear-day.svg';
import clearNightIcon from '@meteocons/svg-static/fill/clear-night.svg';
import drizzleIcon from '@meteocons/svg-static/fill/drizzle.svg';
import extremeRainIcon from '@meteocons/svg-static/fill/extreme-rain.svg';
import extremeSnowIcon from '@meteocons/svg-static/fill/extreme-snow.svg';
import fogIcon from '@meteocons/svg-static/fill/fog.svg';
import mostlyClearDayIcon from '@meteocons/svg-static/fill/mostly-clear-day.svg';
import mostlyClearNightIcon from '@meteocons/svg-static/fill/mostly-clear-night.svg';
import overcastIcon from '@meteocons/svg-static/fill/overcast.svg';
import partlyCloudyDayIcon from '@meteocons/svg-static/fill/partly-cloudy-day.svg';
import partlyCloudyNightIcon from '@meteocons/svg-static/fill/partly-cloudy-night.svg';
import rainIcon from '@meteocons/svg-static/fill/rain.svg';
import sleetIcon from '@meteocons/svg-static/fill/sleet.svg';
import snowIcon from '@meteocons/svg-static/fill/snow.svg';
import thunderstormsIcon from '@meteocons/svg-static/fill/thunderstorms.svg';
import thunderstormsHailIcon from '@meteocons/svg-static/fill/thunderstorms-hail.svg';

type IconResolver = (isDay: boolean) => string;

const staticIcon = (iconUrl: string): IconResolver => {
  return () => iconUrl;
};

const dayNightIcon = (dayIconUrl: string, nightIconUrl: string): IconResolver => {
  return (isDay) => isDay ? dayIconUrl : nightIconUrl;
};

const wmoIconResolvers: Partial<Record<number, IconResolver>> = {
  0: dayNightIcon(clearDayIcon, clearNightIcon),
  1: dayNightIcon(mostlyClearDayIcon, mostlyClearNightIcon),
  2: dayNightIcon(partlyCloudyDayIcon, partlyCloudyNightIcon),
  3: staticIcon(overcastIcon),
  45: staticIcon(fogIcon),
  48: staticIcon(fogIcon),
  51: staticIcon(drizzleIcon),
  53: staticIcon(drizzleIcon),
  55: staticIcon(drizzleIcon),
  56: staticIcon(sleetIcon),
  57: staticIcon(sleetIcon),
  61: staticIcon(rainIcon),
  63: staticIcon(rainIcon),
  65: staticIcon(extremeRainIcon),
  66: staticIcon(sleetIcon),
  67: staticIcon(sleetIcon),
  71: staticIcon(snowIcon),
  73: staticIcon(snowIcon),
  75: staticIcon(extremeSnowIcon),
  77: staticIcon(snowIcon),
  80: staticIcon(rainIcon),
  81: staticIcon(rainIcon),
  82: staticIcon(extremeRainIcon),
  85: staticIcon(snowIcon),
  86: staticIcon(extremeSnowIcon),
  95: staticIcon(thunderstormsIcon),
  96: staticIcon(thunderstormsHailIcon),
  99: staticIcon(thunderstormsHailIcon),
};

export const mapOpenMeteoWeatherIconUrl = (
  weatherCode: number,
  isDay = true,
): string | undefined => {
  return wmoIconResolvers[weatherCode]?.(isDay);
};
