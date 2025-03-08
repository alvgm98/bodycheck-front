export interface BodyComposition {
  date: Date,
  imc: number,
  icc: number | null,
  ica: number | null,

  // Masa Total
  mt: number,

  // Porcentaje Graso
  mgDurninWomersley: number,
  mgJacksonPollock7: number,
  mgJacksonPollock3: number,
  mgWeltman: number,
  mgNavyTape: number,

  // Masa Ósea
  mo: { formula: string, value: number },

  // Masa Muscular
  mm: number,
}
