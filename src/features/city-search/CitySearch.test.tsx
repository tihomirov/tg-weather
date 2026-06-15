import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { City } from '../../entities/city/types';
import { CitySearch } from './CitySearch';
import { useCitySearch } from './useCitySearch';

vi.mock('./useCitySearch', () => ({
  useCitySearch: vi.fn(),
}));

const cities: City[] = [
  {
    id: '1',
    name: 'Kyiv',
    country: 'Ukraine',
    region: 'Kyiv City',
    latitude: 50.4501,
    longitude: 30.5234,
  },
  {
    id: '2',
    name: 'Chernihiv',
    country: 'Ukraine',
    latitude: 49.9935,
    longitude: 36.2304,
  },
];

const useCitySearchMock = vi.mocked(useCitySearch);
const setQueryMock = vi.fn();
const selectCityMock = vi.fn();

const mockUseCitySearch = (
  overrides: Partial<ReturnType<typeof useCitySearch>> = {},
) => {
  useCitySearchMock.mockReturnValue({
    query: '',
    cities,
    isLoading: false,
    error: null,
    setQuery: setQueryMock,
    selectCity: selectCityMock,
    ...overrides,
  });
};

describe('CitySearch', () => {
  beforeEach(() => {
    mockUseCitySearch();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the search input with query and city options', () => {
    mockUseCitySearch({ query: 'Ky' });

    render(<CitySearch onSelectCity={vi.fn()} />);

    expect(screen.getByText('Search city')).toBeInTheDocument();
    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText('Kyiv City, Ukraine')).toBeInTheDocument();
    expect(screen.getByText('Chernihiv')).toBeInTheDocument();
    expect(screen.getByText('Ukraine')).toBeInTheDocument();
  });

  it('updates the search query when the user types', () => {
    render(<CitySearch onSelectCity={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Enter city name'), {
      target: { value: 'Lviv' },
    });

    expect(setQueryMock).toHaveBeenCalledWith('Lviv');
  });

  it('clears the search state and selects a city when an option is clicked', () => {
    const onSelectCity = vi.fn();

    render(<CitySearch onSelectCity={onSelectCity} />);

    fireEvent.click(screen.getByRole('button', { name: 'KyivKyiv City, Ukraine' }));

    expect(selectCityMock).toHaveBeenCalledOnce();
    expect(onSelectCity).toHaveBeenCalledWith(cities[0]);
    expect(selectCityMock.mock.invocationCallOrder[0]).toBeLessThan(
      onSelectCity.mock.invocationCallOrder[0],
    );
  });

  it('passes loading, error, and empty states to autocomplete', () => {
    const { rerender } = render(<CitySearch onSelectCity={vi.fn()} />);

    mockUseCitySearch({ cities: null, isLoading: true });
    rerender(<CitySearch onSelectCity={vi.fn()} />);

    expect(screen.getByText('Searching cities...')).toBeInTheDocument();

    mockUseCitySearch({ cities: null, error: 'Failed to search cities.' });
    rerender(<CitySearch onSelectCity={vi.fn()} />);

    expect(screen.getByText('Failed to search cities.')).toBeInTheDocument();

    mockUseCitySearch({ cities: [] });
    rerender(<CitySearch onSelectCity={vi.fn()} />);

    expect(screen.getByText('No cities found.')).toBeInTheDocument();
  });
});
