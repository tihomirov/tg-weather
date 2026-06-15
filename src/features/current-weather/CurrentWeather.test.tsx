import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { City } from '../../entities/city/types';
import type { CurrentWeather as CurrentWeatherEntity } from '../../entities/weather/types';
import { weatherService } from '../../shared/api/weather';
import { CurrentWeather } from './CurrentWeather';

vi.mock('../../shared/api/weather', () => ({
  weatherService: {
    getCurrentWeather: vi.fn(),
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

const currentWeather = {
  condition: {
    text: 'Sunny',
    iconUrl: 'https://example.com/sunny.svg',
  },
  temperatureCelsius: 21.6,
  feelsLikeCelsius: 20.4,
  humidityPercent: 58,
  windKph: 14.7,
} satisfies CurrentWeatherEntity;

const getCurrentWeatherMock = vi.mocked(weatherService.getCurrentWeather);

describe('CurrentWeather', () => {
  beforeEach(() => {
    getCurrentWeatherMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders a loading state while current weather is pending', () => {
    getCurrentWeatherMock.mockReturnValue(new Promise(() => {}));

    render(<CurrentWeather city={city} />);

    expect(screen.getByText('Loading current weather...')).toBeInTheDocument();
    expect(screen.getByText('Loading current weather...').closest('section'));
    expect(getCurrentWeatherMock).toHaveBeenCalledWith(city);
  });

  it('renders current weather when the selected city loads successfully', async() => {
    getCurrentWeatherMock.mockResolvedValue(currentWeather);

    await act(async() => {
      render(<CurrentWeather city={city} />);
    });

    expect(screen.getByRole('heading', { name: 'Kyiv' })).toBeInTheDocument();
    expect(screen.getByText('Kyiv City, Ukraine')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '22°C' })).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('Feels like')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('58%')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('15 km/h')).toBeInTheDocument();
    expect(document.querySelector('img')).toHaveAttribute('src', currentWeather.condition.iconUrl);
    expect(getCurrentWeatherMock).toHaveBeenCalledWith(city);
  });

  it('renders an error state when current weather fails to load', async() => {
    getCurrentWeatherMock.mockRejectedValue(new Error('Weather unavailable'));

    await act(async() => {
      render(<CurrentWeather city={city} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to load current weather.')).toBeInTheDocument();
    });
  });
});
