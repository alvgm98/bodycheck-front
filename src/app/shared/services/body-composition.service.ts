import { Injectable } from '@angular/core';
import { Measurement } from '../models/measurement';
import Decimal from 'decimal.js';
import { CustomerDetailed } from '../models/customer';
import { BodyComposition } from '../models/body-composition';

@Injectable({
  providedIn: 'root'
})
export class BodyCompositionService {
  calcBodyComposition(customer: CustomerDetailed, measurementSelected: number): BodyComposition {
    const measurement = customer.measurements![measurementSelected];
    const age = this.calcAge(new Date(customer.birthdate), new Date(measurement.date));

    const mt = measurement.weight;

    /* CÁLCULO DE INDICES DE SALUD */
    const { waist, hip } = measurement.circumference!;
    const imc = this.calcIMC(measurement.weight, customer.height);
    const icc = this.calcICC(waist, hip);
    const ica = this.calcICA(waist, customer.height)

    /* CÁLCULO DE MASA GRASA */
    // Calculo las densidades (m/L)
    const dgDurninWomersley = this.calcDurninWomersley(measurement, customer.gender.toString(), age);
    const dgJacksonPollock7 = this.calcJacksonPollock7(measurement, customer.gender.toString(), age);
    const dgJacksonPollock3 = customer.gender.toString() === 'M'
      ? this.calcJacksonPollock3Male(measurement, age)
      : this.calcJacksonPollock3Female(measurement, age);

    // Calculo los porcentajes con la formula de siri
    const pgDurninWomersley = dgDurninWomersley ? this.calcSiri(dgDurninWomersley) : null;
    const pgJacksonPollock7 = dgJacksonPollock7 ? this.calcSiri(dgJacksonPollock7) : null;
    const pgJacksonPollock3 = dgJacksonPollock3 ? this.calcSiri(dgJacksonPollock3) : null;
    const pgWeltman = customer.gender.toString() === 'M' ? this.calcWeltmanMale(measurement) : this.calcWeltmanFemale(measurement, customer.height);
    const pgNavyTape = customer.gender.toString() === 'M' ? this.calcNavyTapeMale(measurement, customer.height) : this.calcNavyTapeFemale(measurement, customer.height);

    // Calculo la masa absoluta de la grasa
    const mgDurninWomersley = pgDurninWomersley ? (pgDurninWomersley / 100) * mt : 0;
    const mgJacksonPollock7 = pgJacksonPollock7 ? (pgJacksonPollock7 / 100) * mt : 0;
    const mgJacksonPollock3 = pgJacksonPollock3 ? (pgJacksonPollock3 / 100) * mt : 0;
    const mgWeltman = pgWeltman ? (pgWeltman / 100) * mt : 0;
    const mgNavyTape = pgNavyTape ? (pgNavyTape / 100) * mt : 0;

    /* CÁLCULO DE MASA ÓSEA */
    const mo = this.calcMO(customer);

    /* CÁLCULO DE MASA MUSCULAR */
    const mme = this.calcLee(
      measurement,
      customer.height,
      customer.gender.toString(),
      age,
      customer.ethnicity.toString()
    );

    const mm = this.calcMM(mme, mo.value);

    return {
      date: customer.measurements![measurementSelected].date,
      imc: imc,
      icc: icc,
      ica: ica,
      mt: mt,
      mgDurninWomersley: mgDurninWomersley,
      mgJacksonPollock7: mgJacksonPollock7,
      mgJacksonPollock3: mgJacksonPollock3,
      mgWeltman: mgWeltman,
      mgNavyTape: mgNavyTape,
      mo: mo,
      mm: mm,
    }
  }

  calcIMC(weight: number, height: number) {
    return new Decimal(weight)
      .div(new Decimal(height / 100).pow(2))
      .toNumber();
  }

  calcICC(waist: number, hip: number) {
    if (!waist || !hip) {
      return null;
    }

    return new Decimal(waist)
      .div(new Decimal(hip))
      .toNumber();
  }

  calcICA(waist: number, height: number) {
    if (!waist || !height) {
      return null;
    }

    return new Decimal(waist)
      .div(new Decimal(height))
      .toNumber();
  }

  calcSiri(density: number) {
    return new Decimal(495)
      .div(new Decimal(density))
      .minus(new Decimal(450))
      .toNumber()
  }

  /* CALCULAR DENSIDAD GRASA */
  calcDurninWomersley(measurement: Measurement, gender: string, age: number) {
    if (!measurement.skinfold) return null;

    const { biceps, triceps, subscapular, iliacCrest } = measurement.skinfold!;

    // Compruebo que existen todos los datos necesarios
    if (!biceps || !triceps || !subscapular || !iliacCrest) {
      return null;
    }

    // Transformo a Decimal
    const bicepsDecimal = new Decimal(biceps);
    const tricepsDecimal = new Decimal(triceps);
    const subscapularDecimal = new Decimal(subscapular);
    const iliacCrestDecimal = new Decimal(iliacCrest);

    // Calculo log10 de la suma de pliegues
    const skinfoldSum = bicepsDecimal.plus(tricepsDecimal).plus(subscapularDecimal).plus(iliacCrestDecimal);
    const log10SkinfoldSum = skinfoldSum.logarithm(10);

    let density: Decimal;

    if (gender === 'M') {
      if (age >= 17 && age <= 19) {
        density = new Decimal(1.1620).minus(new Decimal(0.0630).times(log10SkinfoldSum));
      } else if (age >= 20 && age <= 29) {
        density = new Decimal(1.1631).minus(new Decimal(0.0632).times(log10SkinfoldSum));
      } else if (age >= 30 && age <= 39) {
        density = new Decimal(1.1422).minus(new Decimal(0.0544).times(log10SkinfoldSum));
      } else if (age >= 40 && age <= 49) {
        density = new Decimal(1.1620).minus(new Decimal(0.0700).times(log10SkinfoldSum));
      } else {
        density = new Decimal(1.1715).minus(new Decimal(0.0779).times(log10SkinfoldSum));
      }
    } else {
      if (age >= 17 && age <= 19) {
        density = new Decimal(1.1549).minus(new Decimal(0.0678).times(log10SkinfoldSum));
      } else if (age >= 20 && age <= 29) {
        density = new Decimal(1.1599).minus(new Decimal(0.0717).times(log10SkinfoldSum));
      } else if (age >= 30 && age <= 39) {
        density = new Decimal(1.1423).minus(new Decimal(0.0612).times(log10SkinfoldSum));
      } else if (age >= 40 && age <= 49) {
        density = new Decimal(1.1333).minus(new Decimal(0.0645).times(log10SkinfoldSum));
      } else {
        density = new Decimal(1.1339).minus(new Decimal(0.0645).times(log10SkinfoldSum));
      }
    }

    return density.toNumber();
  }

  calcJacksonPollock7(measurement: Measurement, gender: string, age: number) {
    if (!measurement.skinfold) return null;

    const { pectoral, abdominal, thigh, triceps, subscapular, suprailiac, midaxillary } = measurement.skinfold!;

    // Compruebo que existen todos los datos necesarios
    if (!pectoral || !abdominal || !thigh || !triceps || !subscapular || !suprailiac || !midaxillary) {
      return null;
    }

    // Transformo a Decimal
    const pectoralDecimal = new Decimal(pectoral);
    const abdominalDecimal = new Decimal(abdominal);
    const thighDecimal = new Decimal(thigh);
    const tricepsDecimal = new Decimal(triceps);
    const subscapularDecimal = new Decimal(subscapular);
    const suprailiacDecimal = new Decimal(suprailiac);
    const midaxillaryDecimal = new Decimal(midaxillary);

    // Calculo la suma
    const skinfoldSum = pectoralDecimal
      .plus(abdominalDecimal)
      .plus(thighDecimal)
      .plus(tricepsDecimal)
      .plus(subscapularDecimal)
      .plus(suprailiacDecimal)
      .plus(midaxillaryDecimal);

    // Calculo para hombres
    if (gender === 'M') {
      return new Decimal(1.112)
        .minus(new Decimal(0.00043499).times(skinfoldSum))
        .plus(new Decimal(0.00000055).times(skinfoldSum.pow(2)))
        .minus(new Decimal(0.00028826).times(age))
        .toNumber();
    }
    // Calculo para mujeres
    else {
      return new Decimal(1.097)
        .minus(new Decimal(0.0004697).times(skinfoldSum))
        .plus(new Decimal(0.00000056).times(skinfoldSum.pow(2)))
        .minus(new Decimal(0.00012828).times(age))
        .toNumber();
    }
  }

  calcJacksonPollock3Male(measurement: Measurement, age: number) {
    if (!measurement.skinfold) return null;

    const { pectoral, abdominal, thigh } = measurement.skinfold!;

    // Compruebo que existen todos los datos necesarios
    if (!pectoral || !abdominal || !thigh) {
      return null;
    }

    // Transformo a Decimal
    const pectoralDecimal = new Decimal(pectoral);
    const abdominalDecimal = new Decimal(abdominal);
    const thighDecimal = new Decimal(thigh);

    // Calculo la suma
    const skinfoldSum = pectoralDecimal
      .plus(abdominalDecimal)
      .plus(thighDecimal)

    // Realizo el calculo
    return new Decimal(1.10938)
      .minus(new Decimal(0.0008267).times(skinfoldSum))
      .plus(new Decimal(0.0000016).times(skinfoldSum.pow(2)))
      .minus(new Decimal(0.0002574).times(age))
      .toNumber();
  }
  calcJacksonPollock3Female(measurement: Measurement, age: number) {
    if (!measurement.skinfold) return null;

    const { triceps, suprailiac, thigh } = measurement.skinfold!;

    // Compruebo que existen todos los datos necesarios
    if (!triceps || !suprailiac || !thigh) {
      return null;
    }

    // Transformo a Decimal
    const tricepsDecimal = new Decimal(triceps);
    const suprailiacDecimal = new Decimal(suprailiac);
    const thighDecimal = new Decimal(thigh);

    // Calculo la suma
    const skinfoldSum = tricepsDecimal
      .plus(suprailiacDecimal)
      .plus(thighDecimal)

    // Realizo el calculo
    return new Decimal(1.0994921)
      .minus(new Decimal(0.0009929).times(skinfoldSum))
      .plus(new Decimal(0.0000023).times(skinfoldSum.pow(2)))
      .minus(new Decimal(0.0001392).times(age))
      .toNumber();
  }

  /* CALCULAR PORCENTAJE GRASO */
  calcWeltmanMale(measurement: Measurement) {
    if (!measurement.circumference || !measurement.circumference.waist) return null;

    const waist = measurement.circumference.waist;
    const weight = measurement.weight;

    return new Decimal(0.32457)
      .times(waist)
      .minus(new Decimal(0.10969).times(weight))
      .plus(10.8336)
      .toNumber();
  }
  calcWeltmanFemale(measurement: Measurement, height: number) {
    if (!measurement.circumference || !measurement.circumference.waist) return null;

    const waist = measurement.circumference.waist;
    const weight = measurement.weight;

    return new Decimal(0.11071)
      .times(waist)
      .minus(new Decimal(0.17666).times(height))
      .plus(new Decimal(0.14354).times(weight))
      .plus(51.03301)
      .toNumber();
  }

  calcNavyTapeMale(measurement: Measurement, height: number) {
    if (!measurement.circumference) return null;

    const { waist, neck } = measurement.circumference!;

    // Compruebo que existen todos los datos necesarios
    if (!waist || !neck) {
      return null;
    }

    const logA = new Decimal(new Decimal(waist).minus(neck)).logarithm(10);
    const logB = new Decimal(height).logarithm(10);

    return new Decimal(86.010)
      .times(logA)
      .minus(new Decimal(70.041).times(logB))
      .plus(36.76)
      .toNumber();

  }
  calcNavyTapeFemale(measurement: Measurement, height: number) {
    if (!measurement.circumference) return null;

    const { waist, neck, hip } = measurement.circumference!;

    // Compruebo que existen todos los datos necesarios
    if (!waist || !neck || !hip) {
      return null;
    }

    const logA = new Decimal(new Decimal(waist).plus(hip).minus(neck)).logarithm(10);
    const logB = new Decimal(height).logarithm(10);

    return new Decimal(163.205)
      .times(logA)
      .minus(new Decimal(97.684).times(logB))
      .minus(78.387)
      .toNumber();
  }

  /* CALCULAR MASA OSEA */
  calcMartin(measurement: Measurement, height: number) {
    if (!measurement.diameter) return null;

    const { bistyloid, humeralBicondylar, femoralBicondylar, bimalleolar } = measurement.diameter!;

    if (!bistyloid || !humeralBicondylar || !femoralBicondylar || !bimalleolar) {
      return null;
    }

    const bistyloidDecimal = new Decimal(bistyloid);
    const humeralBicondylarDecimal = new Decimal(humeralBicondylar);
    const femoralBicondylarDecimal = new Decimal(femoralBicondylar);
    const bimalleolarDecimal = new Decimal(bimalleolar);

    return new Decimal(0.00006)
      .times(new Decimal(height))
      .times(
        (bistyloidDecimal
          .plus(humeralBicondylarDecimal)
          .plus(femoralBicondylarDecimal)
          .plus(bimalleolarDecimal)
        ).pow(2))
      .toNumber();
  }

  calcRocha(measurement: Measurement, height: number) {
    if (!measurement.diameter) return null;

    const { bistyloid, femoralBicondylar } = measurement.diameter!;

    if (!bistyloid || !femoralBicondylar) {
      return null;
    }

    // Convierto a Decimal y de cm a metros
    const bistyloidDecimal = new Decimal(bistyloid).div(100);
    const femoralBicondylarDecimal = new Decimal(femoralBicondylar).div(100);
    const heightDecimal = new Decimal(height).div(100);

    return new Decimal(3.02)
      .times(
        ((heightDecimal.pow(2))
          .times(bistyloidDecimal)
          .times(femoralBicondylarDecimal)
          .times(400)
        ).pow(new Decimal(0.712))
      ).toNumber();
  }

  /* CALCULAR MASA MUSCULAR-ESQUELETICA */
  calcLee(measurement: Measurement, height: number, gender: string, age: number, ethnicity: string) {
    if (!measurement.circumference || !measurement.skinfold) return 0;

    const { armRelaxed, thigh, calf } = measurement.circumference!;
    const tricepsP = measurement.skinfold?.triceps;
    const thighP = measurement.skinfold?.thigh;
    const calfP = measurement.skinfold?.calf;

    if (armRelaxed == null || thigh == null || calf == null || tricepsP == null || thighP == null || calfP == null) {
      return 0;
    }

    // 🔹 Convertir a Decimal.js y asegurar unidades en METROS Y CENTÍMETROS
    const heightDecimal = new Decimal(height).div(100); // Convertir talla a metros
    const genderDecimal = gender === 'M' ? new Decimal(1) : new Decimal(0);
    const ethnicityDecimal =
      ethnicity === 'AS' ? new Decimal(2)        // Asiático
        : ethnicity === 'AA' ? new Decimal(1.1)  // Africano
          : new Decimal(0);                        // Caucásico

    // 🔹 Corregir perímetros (restar grosor de la grasa subcutánea)
    const PBC = new Decimal(armRelaxed)  // Perímetro brazo
      .minus(new Decimal(Math.PI).times(new Decimal(tricepsP).div(10)))  // Pliegue triceps en cm
      .toDecimalPlaces(10);  // Redondeo para evitar errores

    const PMC = new Decimal(thigh)  // Perímetro muslo
      .minus(new Decimal(Math.PI).times(new Decimal(thighP).div(10)))  // Pliegue muslo en cm
      .toDecimalPlaces(10);

    const PPC = new Decimal(calf)  // Perímetro gemelo
      .minus(new Decimal(Math.PI).times(new Decimal(calfP).div(10)))  // Pliegue gemelo en cm
      .toDecimalPlaces(10);

    // 🔹 Aplicar la ecuación de Lee
    return heightDecimal
      .times(
        new Decimal(0.00744).times(PBC.pow(2))
          .plus(new Decimal(0.00088).times(PMC.pow(2)))
          .plus(new Decimal(0.00441).times(PPC.pow(2)))
      )
      .plus(new Decimal(2.4).times(genderDecimal))
      .minus(new Decimal(0.048).times(age))
      .plus(ethnicityDecimal)
      .plus(7.8)
      .toNumber();
  }

  /* CALCULAR MASA MUSCULAR */
  calcMM(mme: number, mo: number) {
    return new Decimal(mme).minus(mo).toNumber();
  }

  /**
 * Obtiene la Masa Ósea más actualizada hasta la fecha,
 * Priorizando:
 *    - 1: Actualidad
 *    - 2: Formula Martin
 *    - 3: Formula Rocha
 */
  private calcMO(customer: CustomerDetailed) {
    // Itera las mediciones desde la más actualizada.
    for (let i = customer.measurements!.length - 1; i >= 0; i--) {
      const measurement = customer.measurements![i];

      // Si no ha habido calculo de diametros salto a la siguiente sesión
      if (!measurement.diameter) continue;

      // Intentamos hacer el calculo de Martin que es el más exacto
      const moMartin = this.calcMartin(measurement, customer.height);
      if (moMartin) return { formula: "Martin", value: moMartin };

      // Si falla Martin, intentamos Rocha
      const moRocha = this.calcRocha(measurement, customer.height);
      if (moRocha) return { formula: "Rocha", value: moRocha };
    }
    return { formula: "", value: 0 };
  }

  /** Obtiene la edad del sujeto en el momento de la medición */
  private calcAge(birthdate: Date, measurementDate: Date): number {
    const diff = measurementDate.getTime() - birthdate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
