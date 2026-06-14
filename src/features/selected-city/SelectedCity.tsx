import type { FC } from 'react';
import type { City } from '../../entities/city/types';
import { useGetCityRegion } from '../../shared/hooks';
import styles from './SelectedCity.module.scss';

interface SelectedCityProps {
  city: City | null;
  isFavorite: boolean;
  onToggleFavorite: (city: City) => void;
}

export const SelectedCity: FC<SelectedCityProps> = ({
  city,
  isFavorite,
  onToggleFavorite,
}) => {
  const getCityRegion = useGetCityRegion();

  return (
    <section className={styles.selectedCity}>
      <h2 className={styles.title}>Selected city</h2>

      {!city ? (
        <p className={styles.empty}>Select a city to view weather.</p>
      ) : (
        <div className={styles.cityCard}>
          <div>
            <span className={styles.cityName}>{city.name}</span>
            <span className={styles.cityMeta}>{getCityRegion(city)}</span>
          </div>

          <button
            type='button'
            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonActive : ''}`}
            onClick={() => onToggleFavorite(city)}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      )}
    </section>
  );
};
