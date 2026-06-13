import { useState, type FC } from 'react';
import {
  CitySearch,
  CurrentWeather,
  FavoritesList,
  Forecast,
} from './features';
import styles from './App.module.scss';

type WeatherTab = 'current' | 'forecast';

export const App: FC = () => {
  const [activeTab, setActiveTab] = useState<WeatherTab>('current');

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <FavoritesList />
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <CitySearch />
        </header>

        <section className={styles.weatherPanel}>
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
            {activeTab === 'current' ? <CurrentWeather /> : <Forecast />}
          </div>
        </section>
      </main>
    </div>
  );
};
