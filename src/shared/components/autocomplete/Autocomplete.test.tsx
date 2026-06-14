import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Autocomplete } from './Autocomplete';

interface TestOption {
  id: string;
  name: string;
  description: string;
}

const options: TestOption[] = [
  {
    id: 'kyiv',
    name: 'Kyiv',
    description: 'Kyiv City, Ukraine',
  },
  {
    id: 'lviv',
    name: 'Lviv',
    description: 'Lviv City, Ukraine',
  },
];

const defaultProps = {
  label: 'Search city',
  placeholder: 'Enter city name',
  value: '',
  options,
  onChange: vi.fn(),
  onSelect: vi.fn(),
  getOptionLabel: (option: TestOption) => option.name,
  getOptionDescription: (option: TestOption) => option.description,
};

describe('Autocomplete', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders a controlled input with label and placeholder', () => {
    render(<Autocomplete {...defaultProps} value='Ky' />);

    const input = screen.getByDisplayValue('Ky');

    expect(screen.getByText('Search city')).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter city name');
  });

  it('calls onChange with the typed value', () => {
    const onChange = vi.fn();

    render(<Autocomplete {...defaultProps} onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText('Enter city name'), {
      target: { value: 'Chernihiv' },
    });

    expect(onChange).toHaveBeenCalledWith('Chernihiv');
  });

  it('renders options with labels and descriptions', () => {
    render(<Autocomplete {...defaultProps} />);

    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.getByText('Kyiv City, Ukraine')).toBeInTheDocument();
    expect(screen.getByText('Lviv')).toBeInTheDocument();
    expect(screen.getByText('Lviv Oblast, Ukraine')).toBeInTheDocument();
  });

  it('calls onSelect with the selected option', () => {
    const onSelect = vi.fn();

    render(<Autocomplete {...defaultProps} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'KyivKyiv City, Ukraine' }));

    expect(onSelect).toHaveBeenCalledWith(options[0]);
  });

  it('renders loading, error, and empty states', () => {
    const { rerender } = render(
      <Autocomplete
        {...defaultProps}
        options={null}
        isLoading
        loadingMessage='Searching cities...'
      />,
    );

    expect(screen.getByText('Searching cities...')).toBeInTheDocument();

    rerender(<Autocomplete {...defaultProps} error='Search failed.' options={null} />);

    expect(screen.getByText('Search failed.')).toBeInTheDocument();

    rerender(<Autocomplete {...defaultProps} emptyMessage='No cities found.' options={[]} />);

    expect(screen.getByText('No cities found.')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
