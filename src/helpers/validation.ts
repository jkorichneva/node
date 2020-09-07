import VALIDATION_RULES from './validationRules';

export default function validate(field: string, value: string): string|null {
  if (!value) {
    return 'empty';
  }
  if (VALIDATION_RULES[field]) {
    if (VALIDATION_RULES[field].length && value.length < VALIDATION_RULES[field].length) {
      return 'length';
    }
    if (VALIDATION_RULES[field].regx && !VALIDATION_RULES[field].regx.test(value)) {
      return 'validation';
    }
  }
  return null;
}
