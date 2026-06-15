import type { FC } from 'react';
import type { City } from '../../entities/city/types';
import styles from './FavoritesList.module.scss';
import { useGetCityRegion } from '../../shared/hooks';

interface FavoritesListItemProps {
  city: City;
  selectedCityId?: string;
  onSelectCity: (city: City) => void;
  onRemoveCity: (cityId: string) => void;
}

export const FavoritesListItem: FC<FavoritesListItemProps> = ({
  city,
  selectedCityId,
  onSelectCity,
  onRemoveCity,
}) => {
  const getCityRegion= useGetCityRegion();
  const isSelected = selectedCityId === city.id;

  return (
    <li className={styles.item}>
      <button
        type='button'
        className={`${styles.cityButton} ${isSelected ? styles.selected : ''}`}
        onClick={() => onSelectCity(city)}
      >
        <span className={styles.cityName}>{city.name}</span>
        <span className={styles.cityMeta}>{getCityRegion(city)}</span>
      </button>

      <button
        type='button'
        className={styles.removeButton}
        onClick={() => onRemoveCity(city.id)}
      >
        &times;
      </button>
    </li>
  );
};
