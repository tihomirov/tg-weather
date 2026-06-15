import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { City } from '../../entities/city/types';
import type { WeatherForecast } from '../../entities/weather/types';
import { weatherService } from '../../shared/api/weather';
import { Forecast } from './Forecast';

vi.mock('../../shared/api/weather', () => ({
  weatherService: {
    getForecast: vi.fn(),
  },
}));

const city: City = {
  id: '1',
  name: 'Kyiv',
  country: 'Ukraine',
  region: 'Kyiv City',
  latitude: 50.4501,
  longitude: 30.5234,
};

const forecast = {
  days: [
    {
      date: '2026-06-14',
      condition: {
        text: 'Sunny',
        iconUrl: 'https://example.com/sunny.svg',
      },
      minTemperatureCelsius: 17.2,
      maxTemperatureCelsius: 25.8,
    },
    {
      date: '2026-06-15',
      condition: {
        text: 'Partly cloudy',
      },
      minTemperatureCelsius: 16.4,
      maxTemperatureCelsius: 23.1,
    },
  ],
} satisfies WeatherForecast;

const getForecastMock = vi.mocked(weatherService.getForecast);

describe('Forecast', () => {
  beforeEach(() => {
    getForecastMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders a loading state while forecast is pending', () => {
    getForecastMock.mockReturnValue(new Promise(() => {}));

    render(<Forecast city={city} />);

    expect(screen.getByText('Loading forecast...')).toBeInTheDocument();
    expect(getForecastMock).toHaveBeenCalledWith(city);
  });

  it('renders forecast days when the selected city loads successfully', async() => {
    getForecastMock.mockResolvedValue(forecast);

    await act(async() => {
      render(<Forecast city={city} />);
    });

    expect(screen.getByRole('heading', { name: 'Kyiv forecast' })).toBeInTheDocument();
    expect(screen.getByText('Jun 14')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('26°C')).toBeInTheDocument();
    expect(screen.getByText('17°C')).toBeInTheDocument();
    expect(screen.getByText('Jun 15')).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByText('23°C')).toBeInTheDocument();
    expect(screen.getByText('16°C')).toBeInTheDocument();
    expect(document.querySelector('img')).toHaveAttribute('src', forecast.days[0].condition.iconUrl);
    expect(getForecastMock).toHaveBeenCalledWith(city);
  });

  it('renders an error state when forecast fails to load', async() => {
    getForecastMock.mockRejectedValue(new Error('Forecast unavailable'));

    await act(async() => {
      render(<Forecast city={city} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to load forecast.')).toBeInTheDocument();
    });
  });
});
