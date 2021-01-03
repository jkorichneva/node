const VALIDATION_RULES: ValidationRules = {
  username: {
    regx: /^[A-Za-z0-9]+$/,
    length: 5,
  },
  password: {
    regx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    length: 4,
  },
};

type ValidationRule = {
  regx: RegExp;
  length: number;
}

export type ValidationRules = {
  username: ValidationRule;
  password: ValidationRule;
  [key: string]: ValidationRule;
}

export default VALIDATION_RULES;
