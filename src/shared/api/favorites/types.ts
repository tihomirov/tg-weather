import type { City } from '../../../entities/city/types';

export interface FavoritesRepository {
  getAll(): Promise<City[]>;
  add(city: City): Promise<City[]>;
  remove(cityId: string): Promise<City[]>;
  exists(cityId: string): Promise<boolean>;
}
