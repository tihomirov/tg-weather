import { type FC } from 'react';
import type { City } from '../../entities/city/types';
import { CurrentWeatherEmpty } from './CurrentWeatherStates';
import { CityCurrentWeather } from './CityCurrentWeather.tsx';

type CurrentWeatherProps = {
  city: City | null;
};

export const CurrentWeather: FC<CurrentWeatherProps> = ({ city }) => {
  if (!city) {
    return <CurrentWeatherEmpty />;
  }

  return <CityCurrentWeather city={city} />;
};
