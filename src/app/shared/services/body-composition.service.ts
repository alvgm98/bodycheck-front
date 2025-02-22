import { Injectable } from '@angular/core';
import { Measurement } from '../models/measurement';
import Decimal from 'decimal.js';

@Injectable({
  providedIn: 'root'
})
export class BodyCompositionService {
  /*calcJacksonPollockDensity7(measurement: Measurement, age: number, gender: string): number {

      // Calculo para hombres
      if (gender === 'M') {
        const skinfoldSum = new Decimal();

        return new Decimal(1.10938)
          .minus(new Decimal(0.0008267).times(skinfoldSum))
          .plus(new Decimal(0.0000016).times(skinfoldSum.pow(2)))
          .minus(new Decimal(0.0002574).times(age))
          .toNumber();
      }
      // Calculo para mujeres
      else {
        return new Decimal(1.0994921)
          .minus(new Decimal(0.0009929).times(skinfoldSum))
          .plus(new Decimal(0.0000023).times(skinfoldSum.pow(2)))
          .minus(new Decimal(0.0001392).times(age))
          .toNumber();
      }
    } */

  calcIMC(measurement: Measurement, gender: string) {

  }
  calcYMCA(measurement: Measurement, gender: string) {

  }
  calcModifiedYMCA(measurement: Measurement, gender: string) {

  }
  calcJacksonPollock7(measurement: Measurement, gender: string) {

  }
  calcJacksonPollock4(measurement: Measurement, gender: string) {

  }
  calcJacksonPollock3(measurement: Measurement, gender: string) {

  }
  calcParrillo(measurement: Measurement, gender: string) {

  }
  calcDurninWomersley(measurement: Measurement, gender: string) {

  }
  calcNavyTape(measurement: Measurement, gender: string) {

  }
}
