import { useCallback, useEffect, useState } from 'react';
import type { City } from '../../entities/city/types';
import { favoritesRepository } from '../../shared/api/favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void favoritesRepository.getAll()
      .then((loadedFavorites) => {
        setError(null);
        setFavorites(loadedFavorites);
      })
      .catch(() => {
        setError('Failed to load favorite cities.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addFavorite = useCallback(async(city: City) => {
    try {
      setFavorites(await favoritesRepository.add(city));
    } catch {
      setError('Failed to add city to favorites.');
    }
  }, []);

  const removeFavorite = useCallback(async(cityId: string) => {
    try {
      setFavorites(await favoritesRepository.remove(cityId));
    } catch {
      setError('Failed to remove city from favorites.');
    }
  }, []);

  const isCityFavorite = useCallback((cityId: string) => {
    return favorites.some((favorite) => favorite.id === cityId);
  }, [favorites]);

  const toggleFavorite = useCallback((city: City) => {
    if (isCityFavorite(city.id)) {
      void removeFavorite(city.id);
    } else {
      void addFavorite(city);
    }
  }, [addFavorite, isCityFavorite, removeFavorite]);

  return {
    favorites,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    isCityFavorite,
    toggleFavorite,
  };
};
