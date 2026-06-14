import { useState, type FC } from 'react';
import {
  CitySearch,
  CurrentWeather,
  FavoritesList,
  Forecast,
  SelectedCity,
  useFavorites,
} from './features';
import type { City } from './entities/city/types';
import styles from './App.module.scss';

type WeatherTab = 'current' | 'forecast';

export const App: FC = () => {
  const [activeTab, setActiveTab] = useState<WeatherTab>('current');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const {
    favorites,
    isLoading: isFavoritesLoading,
    error: favoritesError,
    removeFavorite,
    isCityFavorite,
    toggleFavorite,
  } = useFavorites();

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <SelectedCity
          city={selectedCity}
          isFavorite={selectedCity !== null && isCityFavorite(selectedCity.id)}
          onToggleFavorite={toggleFavorite}
        />

        <FavoritesList
          favorites={favorites}
          isLoading={isFavoritesLoading}
          error={favoritesError}
          selectedCityId={selectedCity?.id}
          onSelectCity={setSelectedCity}
          onRemoveCity={cityId => removeFavorite(cityId)}
        />
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <CitySearch onSelectCity={setSelectedCity} />
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
            {activeTab === 'current' ? (
              <CurrentWeather city={selectedCity} />
            ) : (
              <Forecast />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
