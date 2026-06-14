import { useState, type FC } from 'react';
import type { City } from '../../entities/city/types';
import { CurrentWeather } from '../current-weather';
import { Forecast } from '../forecast';
import styles from './WeatherContent.module.scss';

type WeatherTab = 'current' | 'forecast';

interface WeatherContentProps {
  city: City | null;
}

export const WeatherContent: FC<WeatherContentProps> = ({ city }) => {
  const [activeTab, setActiveTab] = useState<WeatherTab>('current');

  if (!city) {
    return (
      <p className={styles.emptyMessage}>Select a city to view weather.</p>
    );
  }

  return (
    <div className={styles.content}>
      <div className={styles.weatherTabs}>
        <button
          type='button'
          className={`${styles.tabButton} ${activeTab === 'current' ? styles.active : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Current
        </button>
        <button
          type='button'
          className={`${styles.tabButton} ${activeTab === 'forecast' ? styles.active : ''}`}
          onClick={() => setActiveTab('forecast')}
        >
          Forecast
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'current' ? (
          <CurrentWeather city={city} />
        ) : (
          <Forecast city={city} />
        )}
      </div>
    </div>
  );
};
