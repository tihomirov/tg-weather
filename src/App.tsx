import { useState, type FC } from 'react';
import {
  CitySearch,
  FavoritesList,
  SelectedCity,
  WeatherContent,
  useFavorites,
} from './features';
import type { City } from './entities/city/types';
import styles from './App.module.scss';

export const App: FC = () => {
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
          <WeatherContent city={selectedCity} />
        </section>
      </main>
    </div>
  );
};
