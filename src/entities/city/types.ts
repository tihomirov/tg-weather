export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  region?: string;
  countryCode?: string;
  timezone?: string;
}
