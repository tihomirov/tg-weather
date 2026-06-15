import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { City } from '../../entities/city/types';
import { WeatherContent } from './WeatherContent';

vi.mock('../current-weather', () => ({
  CurrentWeather: ({ city }: { city: City }) => (
    <div>Current weather for {city.name}</div>
  ),
}));

vi.mock('../forecast', () => ({
  Forecast: ({ city }: { city: City }) => (
    <div>Forecast for {city.name}</div>
  ),
}));

const city: City = {
  id: '1',
  name: 'Kyiv',
  country: 'Ukraine',
  region: 'Kyiv City',
  latitude: 50.4501,
  longitude: 30.5234,
};

describe('WeatherContent', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a message instead of tabs when no city is selected', () => {
    render(<WeatherContent city={null} />);

    expect(screen.getByText('Select a city to view weather.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Current' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Forecast' })).not.toBeInTheDocument();
  });

  it('renders current weather by default when a city is selected', () => {
    render(<WeatherContent city={city} />);

    expect(screen.getByRole('button', { name: 'Current' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Forecast' })).toBeInTheDocument();
    expect(screen.getByText('Current weather for Kyiv')).toBeInTheDocument();
  });

  it('switches to the forecast tab for the selected city', () => {
    render(<WeatherContent city={city} />);

    fireEvent.click(screen.getByRole('button', { name: 'Forecast' }));

    expect(screen.getByText('Forecast for Kyiv')).toBeInTheDocument();
  });
});
