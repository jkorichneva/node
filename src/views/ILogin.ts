export interface LoginState {
  fields: Array<Field>;
}

export interface Field {
  name: string;
  type: 'text' | 'password';
  label: string;
  required?: boolean;
  hint?: string;
  value: string;
  error: string | null;
}
