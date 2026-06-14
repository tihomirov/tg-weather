import type { FC } from 'react';
import type { City } from '../../entities/city/types';
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
    <section className={styles.favorites} aria-label='Favorite cities'>
      <h2 className={styles.title}>Favorite cities</h2>

      {isLoading && (
        <p className={styles.message}>Loading favorite cities...</p>
      )}

      {error !== null ? (
        <p className={styles.error}>{error}</p>
      ) : null}

      {favorites.length === 0 && !isLoading && (
        <p className={styles.message}>
          No favorite cities yet.
        </p>
      )}

      {favorites.length > 0 && !isLoading && (
        <ul className={styles.list}>
          {favorites.map((favorite) => {
            const isSelected = selectedCityId === favorite.id;
            const cityMeta = favorite.region === undefined
              ? favorite.country
              : `${favorite.region}, ${favorite.country}`;

            return (
              <li className={styles.item} key={favorite.id}>
                <button
                  type='button'
                  className={`${styles.cityButton} ${isSelected ? styles.selected : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => onSelectCity(favorite)}
                >
                  <span className={styles.cityName}>{favorite.name}</span>
                  <span className={styles.cityMeta}>{cityMeta}</span>
                </button>

                <button
                  type='button'
                  className={styles.removeButton}
                  aria-label={`Remove ${favorite.name} from favorites`}
                  onClick={() => onRemoveCity(favorite.id)}
                >
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
