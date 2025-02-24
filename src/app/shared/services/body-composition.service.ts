import { Injectable } from '@angular/core';
import { Measurement } from '../models/measurement';
import Decimal from 'decimal.js';

@Injectable({
  providedIn: 'root'
})
export class BodyCompositionService {
  calcIMC(weight: number, height: number) {
    return new Decimal(weight)
      .div(new Decimal(height / 100).pow(2))
      .toNumber();
  }

  calcICC(waist: number, hip: number) {
    return new Decimal(waist)
      .div(new Decimal(hip))
      .toNumber();
  }

  calcICA(waist: number, height: number) {
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

  /* CALCULAR MASA GRASA MEDIANTE PLIEGUES */
  calcDurninWomersley(measurement: Measurement, gender: string, age: number) {
    const { biceps, triceps, subscapular, suprailiac } = measurement.skinfold!;

    // Compruebo que existen todos los datos necesarios
    if (!biceps || !triceps || !subscapular || !suprailiac) {
      return null;
    }

    // Transformo a Decimal
    const bicepsDecimal = new Decimal(biceps);
    const tricepsDecimal = new Decimal(triceps);
    const subscapularDecimal = new Decimal(subscapular);
    const suprailiacDecimal = new Decimal(suprailiac);

    // Calculo log10 de la suma de pliegues
    const skinfoldSum = bicepsDecimal.plus(tricepsDecimal).plus(subscapularDecimal).plus(suprailiacDecimal);
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

  /* CALCULAR MASA GRASA MEDIANTE PERIMETROS */
  calcParrillo(measurement: Measurement, gender: string) {

  }
  calcNavyTape(measurement: Measurement, gender: string) {

  }

  /* CALCULAR MASA OSEA */
  calcRocha(measurement: Measurement, gender: string) {

  }
  calcMartin(measurement: Measurement, gender: string) {

  }

  /* CALCULAR MASA MUSCULAR */
  calcLee(measurement: Measurement, gender: string) {

  }
  calcPoortmans(measurement: Measurement, gender: string) {

  }
}
