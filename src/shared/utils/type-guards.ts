export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const optionalNumber = (value: unknown): number | undefined => {
  return isNumber(value) ? value : undefined;
};

export const optionalString = (value: unknown): string | undefined => {
  return isString(value) && value.length > 0 ? value : undefined;
};
