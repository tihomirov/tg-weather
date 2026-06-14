import { useState, type FC } from 'react';
import {
  CitySearch,
  CurrentWeather,
  FavoritesList,
  Forecast,
  useFavorites,
} from './features';
import type { City } from './entities/city/types';
import styles from './App.module.scss';

type WeatherTab = 'current' | 'forecast';

export const App: FC = () => {
  const [activeTab, setActiveTab] = useState<WeatherTab>('current');
  const [selectedFavoriteCity, setSelectedFavoriteCity] = useState<City | null>(null);
  const {
    favorites,
    isLoading: isFavoritesLoading,
    error: favoritesError,
    removeFavorite,
  } = useFavorites();

  const handleRemoveFavorite = (cityId: string) => {
    if (selectedFavoriteCity?.id === cityId) {
      setSelectedFavoriteCity(null);
    }

    void removeFavorite(cityId);
  };

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <FavoritesList
          favorites={favorites}
          isLoading={isFavoritesLoading}
          error={favoritesError}
          selectedCityId={selectedFavoriteCity?.id}
          onSelectCity={setSelectedFavoriteCity}
          onRemoveCity={handleRemoveFavorite}
        />
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
