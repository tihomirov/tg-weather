import type { FC } from 'react';
import type { City } from '../../entities/city/types';
import { FavoritesListItem } from './FavoritesListItem.tsx';
import styles from './FavoritesList.module.scss';

interface FavoritesListProps {
  favorites: City[];
  isLoading: boolean;
  error: string | null;
  selectedCityId?: string;
  onSelectCity: (city: City) => void;
  onRemoveCity: (cityId: string) => void;
}

export const FavoritesList: FC<FavoritesListProps> = ({
  favorites,
  isLoading,
  error,
  selectedCityId,
  onSelectCity,
  onRemoveCity,
}) => {
  return (
    <section className={styles.favorites}>
      <h2 className={styles.title}>Favorite cities</h2>

      {isLoading && (
        <p className={styles.message}>Loading favorite cities...</p>
      )}

      {error !== null ? (
        <p className={styles.error}>{error}</p>
      ) : null}

      {favorites.length === 0 && (
        <p className={styles.message}>
          No favorite cities yet.
        </p>
      )}

      {favorites.length > 0 && (
        <ul className={styles.list}>
          {favorites.map((favorite) => (
            <FavoritesListItem 
              key={favorite.id} 
              city={favorite} 
              onSelectCity={onSelectCity}
              selectedCityId={selectedCityId} 
              onRemoveCity={onRemoveCity}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
