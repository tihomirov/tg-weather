import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { City } from '../../entities/city/types';
import { FavoritesList } from './FavoritesList';

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
    latitude: 51.4982,
    longitude: 31.2893,
  },
];

describe('FavoritesList', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders favorite cities with their region details', () => {
    render(
      <FavoritesList
        favorites={cities}
        isLoading={false}
        error={null}
        selectedCityId='1'
        onSelectCity={vi.fn()}
        onRemoveCity={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Favorite cities' })).toBeInTheDocument();
    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText('Kyiv City, Ukraine')).toBeInTheDocument();
    expect(screen.getByText('Chernihiv')).toBeInTheDocument();
    expect(screen.getByText('Ukraine')).toBeInTheDocument();
  });

  it('renders loading, error, and empty states', () => {
    const { rerender } = render(
      <FavoritesList
        favorites={[]}
        isLoading={true}
        error={null}
        onSelectCity={vi.fn()}
        onRemoveCity={vi.fn()}
      />,
    );

    expect(screen.getByText('Loading favorite cities...')).toBeInTheDocument();

    rerender(
      <FavoritesList
        favorites={[]}
        isLoading={false}
        error='Failed to load favorite cities.'
        onSelectCity={vi.fn()}
        onRemoveCity={vi.fn()}
      />,
    );

    expect(screen.getByText('Failed to load favorite cities.')).toBeInTheDocument();

    rerender(
      <FavoritesList
        favorites={[]}
        isLoading={false}
        error={null}
        onSelectCity={vi.fn()}
        onRemoveCity={vi.fn()}
      />,
    );

    expect(screen.getByText('No favorite cities yet.')).toBeInTheDocument();
  });

  it('calls onSelectCity when a favorite city is clicked', () => {
    const onSelectCity = vi.fn();

    render(
      <FavoritesList
        favorites={cities}
        isLoading={false}
        error={null}
        onSelectCity={onSelectCity}
        onRemoveCity={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'KyivKyiv City, Ukraine' }));

    expect(onSelectCity).toHaveBeenCalledWith(cities[0]);
  });

  it('calls onRemoveCity when a favorite city is removed', () => {
    const onRemoveCity = vi.fn();

    render(
      <FavoritesList
        favorites={cities}
        isLoading={false}
        error={null}
        onSelectCity={vi.fn()}
        onRemoveCity={onRemoveCity}
      />,
    );

    fireEvent.click(screen.getAllByRole('button', { name: '×' })[0]);

    expect(onRemoveCity).toHaveBeenCalledWith(cities[0].id);
  });
});
