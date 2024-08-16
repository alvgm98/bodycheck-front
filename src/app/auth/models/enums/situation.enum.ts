export enum Situation {
  E, P
}

export const SITUATION_OPTIONS = [
  { key: 'E', value: 'Estudiante' },
  { key: 'P', value: 'Profesional' }
];

export function stringToSituation(value: string): Situation {
  return Situation[value as keyof typeof Situation];
}
