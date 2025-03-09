export interface BodyComposition {
  date: Date,
  imc: number,
  icc: number | null,
  ica: number | null,

  // Masa Total
  mt: number,

  // Masa Grasa: Durnin-Womersley, Jackson-Pollock 7, Jackson-Pollock 3, Weltman, Navy Tape
  mg: Array<{ formula: string, value: number }>,

  // Masa Ósea
  mo: { formula: string, value: number },

  // Masa Muscular
  mm: number,
}
