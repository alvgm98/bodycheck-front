export enum Ethnicity {
  AS, AA, CH
}

export const ETHNICITY_OPTIONS = [
  { key: 'AS', value: 'Asiática' },
  { key: 'AA', value: 'Africana' },
  { key: 'CH', value: 'Caucásica' }
];

export function stringToEthnicity(value: string): Ethnicity {
  return Ethnicity[value as keyof typeof Ethnicity];
}
