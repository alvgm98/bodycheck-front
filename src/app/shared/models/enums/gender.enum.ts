export enum Gender {
  M, F
}

export const GENDER_OPTIONS = [
  { key: 'M', value: 'Masculino' },
  { key: 'F', value: 'Femenino' }
];

export function stringToGender(value: string): Gender {
  return Gender[value as keyof typeof Gender];
}
