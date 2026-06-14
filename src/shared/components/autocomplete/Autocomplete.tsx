import { type ChangeEvent } from 'react';
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
  const shouldShowOptions = !!options?.length;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.autocomplete}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
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
                  onClick={() => onSelect(option)}
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
