import { type ChangeEvent, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks';
import styles from './Autocomplete.module.scss';

interface AutocompleteOption {
  id: string;
}

interface AutocompleteProps<TOption extends AutocompleteOption> {
  label: string;
  placeholder?: string;
  value: string;
  options: TOption[] | null;
  onChange: (value: string) => void;
  onSelect: (option: TOption) => void;
  getOptionLabel: (option: TOption) => string;
  getOptionDescription: (option: TOption) => string;
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  loadingMessage?: string;
}

export const Autocomplete = <TOption extends AutocompleteOption>({
  label,
  placeholder,
  value,
  options,
  isLoading = false,
  error = null,
  emptyMessage = 'No results found.',
  loadingMessage = 'Loading...',
  onChange,
  onSelect,
  getOptionLabel,
  getOptionDescription,
}: AutocompleteProps<TOption>) => {
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const shouldShowOptions = isOpen && !!options?.length;
  const shouldShowClearButton = value.length > 0;

  useClickOutside(autocompleteRef, () => setIsOpen(false));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true);
    onChange(event.target.value);
  };

  const handleClear = () => {
    setIsOpen(false);
    onChange('');
  };

  const onSelectOption = (option: TOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
        />
        {shouldShowClearButton && (
          <button
            type='button'
            className={styles.clearButton}
            aria-label='Clear search'
            onClick={handleClear}
          >
            &times;
          </button>
        )}
      </div>
      {isLoading && <p className={styles.status}>{loadingMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}
      {options?.length === 0 && <p className={styles.status}>{emptyMessage}</p>}

      {shouldShowOptions && (
        <ul className={styles.list}>
          {options.map((option) => {
            const optionDescription = getOptionDescription?.(option);

            return (
              <li key={option.id}>
                <button
                  type='button'
                  className={styles.optionButton}
                  onClick={() => onSelectOption(option)}
                >
                  <span className={styles.optionLabel}>{getOptionLabel(option)}</span>
                  <span className={styles.optionDescription}>{optionDescription}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
