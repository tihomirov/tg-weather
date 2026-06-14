import type { City } from '../../../entities/city/types';
import {
  isNumber,
  isRecord,
  isString,
  optionalString,
} from '../../utils/type-guards';

export const isCity = (value: unknown): value is City => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id)
    && isString(value.name)
    && isString(value.country)
    && isNumber(value.latitude)
    && isNumber(value.longitude)
    && (value.region === undefined || optionalString(value.region) !== undefined)
    && (value.countryCode === undefined || optionalString(value.countryCode) !== undefined)
    && (value.timezone === undefined || optionalString(value.timezone) !== undefined)
  );
};
