import { Component, effect, input } from '@angular/core';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';
import { CustomerDetailed } from '../../../shared/models/customer';
import { ImcComponent } from './components/imc/imc.component';
import { IccComponent } from './components/icc/icc.component';
import { IcaComponent } from './components/ica/ica.component';

@Component({
  selector: 'app-body-composition',
  standalone: true,
  imports: [ImcComponent, IccComponent, IcaComponent],
  templateUrl: './body-composition.component.html',
  styleUrl: './body-composition.component.scss'
})
export class BodyCompositionComponent {

  customer = input.required<CustomerDetailed>();
  measurementSelected = input.required<number>();

  trigger = input<number>(); // Cambio el valor de este trigger para ejecutar el effect de calcular formulas ya que los campos de customer no ejecutan el effect

  // Indices
  imc!: number;
  icc!: number | null;
  ica!: number | null;

  // Porcentaje Graso
  pgDurninWomersley!: number | null;
  pgJacksonPollock7!: number | null;
  pgJacksonPollock3!: number | null;

  // Masa Ósea
  mo!: { formula: string, value: number } | null;

  // Masa Musculo-Esqueletica
  mme!: number | null;

  constructor(
    private bodyCompositionService: BodyCompositionService
  ) {
    effect(() => {
      this.trigger();
      this.calcFormulas(this.customer(), this.measurementSelected());
    });
  }

  calcFormulas(customer: CustomerDetailed, measurementSelected: number): void {
    const age = this.calcAge(new Date(customer.birthdate), new Date(customer.measurements![measurementSelected].date));

    /* CÁLCULO DE INDICES DE SALUD */
    const { waist, hip } = customer.measurements![measurementSelected].circumference!;
    this.imc = this.bodyCompositionService.calcIMC(customer.measurements![measurementSelected].weight, customer.height);
    this.icc = this.bodyCompositionService.calcICC(waist, hip);
    this.ica = this.bodyCompositionService.calcICA(waist, customer.height)

    /* CÁLCULO DE PORCENTAJE GRASO */
    // Calculo las densidades (m/L)
    const dgDurninWomersley = this.bodyCompositionService.calcDurninWomersley(customer.measurements![measurementSelected], customer.gender.toString(), age);
    const dgJacksonPollock7 = this.bodyCompositionService.calcJacksonPollock7(customer.measurements![measurementSelected], customer.gender.toString(), age);
    const dgJacksonPollock3 = customer.gender.toString() === 'M'
      ? this.bodyCompositionService.calcJacksonPollock3Male(customer.measurements![measurementSelected], age)
      : this.bodyCompositionService.calcJacksonPollock3Female(customer.measurements![measurementSelected], age);

    // Calculo los porcentajes con la formula de siri
    this.pgDurninWomersley = dgDurninWomersley ? this.bodyCompositionService.calcSiri(dgDurninWomersley) : null;
    this.pgJacksonPollock7 = dgJacksonPollock7 ? this.bodyCompositionService.calcSiri(dgJacksonPollock7) : null;
    this.pgJacksonPollock3 = dgJacksonPollock3 ? this.bodyCompositionService.calcSiri(dgJacksonPollock3) : null;

    /* CÁLCULO DE MASA ÓSEA */
    this.mo = this.calcMO(customer);

    /* CÁLCULO DE MASA MUSCULAR */
    this.mme = this.bodyCompositionService.calcLee(
      customer.measurements![measurementSelected],
      customer.height,
      customer.gender.toString(),
      age,
      customer.ethnicity.toString()
    );

    console.log('Porcentaje Graso', this.pgDurninWomersley);
    console.log('Masa Osea', this.mo);
    console.log('Masa Musuclar-Esqueletica', this.mme);
  }

  private calcAge(birthdate: Date, measurementDate: Date): number {
    const diff = measurementDate.getTime() - birthdate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
      const moMartin = this.bodyCompositionService.calcMartin(measurement, customer.height);
      if (moMartin) return { formula: "Martin", value: moMartin };

      // Si falla Martin, intentamos Rocha
      const moRocha = this.bodyCompositionService.calcRocha(measurement, customer.height);
      if (moRocha) return { formula: "Rocha", value: moRocha };
    }
    return null;
  }
}
