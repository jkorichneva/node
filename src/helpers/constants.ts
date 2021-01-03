const ERROR_TEXTS: ErrorTexts = {
  username: {
    validation: 'Username is not valid. Latin or digits only',
    empty: 'Username cannot be empty',
    length: 'Username is too short',
  },
  password: {
    validation: 'Minimum eight characters, at least one lowercase letter, one uppercase letter and one number',
    empty: 'Password cannot be empty',
    length: 'Password is too short',
  },
};

type ErrorText = {
  validation: string;
  empty: string;
  length: string;
  [key: string]: string;
}

export type ErrorTexts = {
  username: ErrorText;
  password: ErrorText;
  [key: string]: ErrorText;
}

export default ERROR_TEXTS;
