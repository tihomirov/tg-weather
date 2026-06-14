import type { FC } from 'react';
import type { City } from '../../entities/city/types';
import styles from './SelectedCity.module.scss';

interface SelectedCityProps {
  city: City | null;
  isFavorite: boolean;
  onToggleFavorite: (city: City) => void;
}

const formatCityMeta = (city: City): string => {
  return city.region === undefined
    ? city.country
    : `${city.region}, ${city.country}`;
};

export const SelectedCity: FC<SelectedCityProps> = ({
  city,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <section className={styles.selectedCity}>
      <h2 className={styles.title}>Selected city</h2>

      {!city ? (
        <p className={styles.empty}>Select a city to view weather.</p>
      ) : (
        <div className={styles.cityCard}>
          <div>
            <span className={styles.cityName}>{city.name}</span>
            <span className={styles.cityMeta}>{formatCityMeta(city)}</span>
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
