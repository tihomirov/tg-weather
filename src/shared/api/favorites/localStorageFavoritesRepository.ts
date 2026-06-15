import type { City } from '../../../entities/city/types';
import { isCity } from './guards';
import type { FavoritesRepository } from './types';

const FAVORITES_STORAGE_KEY = 'weather:favorites';

export const createLocalStorageFavoritesRepository = (): FavoritesRepository => {
  const readFavorites = (): City[] => {
    const serializedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (serializedFavorites === null) {
      return [];
    }

    try {
      const parsedFavorites: unknown = JSON.parse(serializedFavorites);

      if (!Array.isArray(parsedFavorites)) {
        return [];
      }

      return parsedFavorites.filter(isCity);
    } catch {
      return [];
    }
  };

  const writeFavorites = (favorites: City[]): City[] => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );

    return favorites;
  };

  return {
    getAll: async() => {
      return readFavorites();
    },
    add: async(city) => {
      const favorites = readFavorites();

      if (favorites.some((favorite) => favorite.id === city.id)) {
        return favorites;
      }

      return writeFavorites([...favorites, city]);
    },
    remove: async(cityId) => {
      return writeFavorites(
        readFavorites().filter((favorite) => favorite.id !== cityId),
      );
    },
  };
};
