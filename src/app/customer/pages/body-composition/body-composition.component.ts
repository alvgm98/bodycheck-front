import { Component, computed, effect, input, OnInit } from '@angular/core';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';
import { CustomerDetailed } from '../../../shared/models/customer';
import { ImcComponent } from './components/imc/imc.component';
import { IccComponent } from './components/icc/icc.component';

@Component({
  selector: 'app-body-composition',
  standalone: true,
  imports: [ImcComponent, IccComponent],
  templateUrl: './body-composition.component.html',
  styleUrl: './body-composition.component.scss'
})
export class BodyCompositionComponent {

  customer = input.required<CustomerDetailed>();
  measurementSelected = input.required<number>();

  trigger = input<number>(); // Cambio el valor de este trigger para ejecutar el effect de calcular formulas ya que los campos de customer no ejecutan el effect

  imc!: number;
  icc!: number | null;
  ica!: number | null;

  constructor(
    private bodyCompositionService: BodyCompositionService
  ) {
    effect(() => {
      this.trigger();
      this.calcFormulas(this.customer(), this.measurementSelected());
    });
  }

  calcFormulas(customer: CustomerDetailed, measurementSelected: number): void {
    this.imc = this.bodyCompositionService.calcIMC(customer.measurements![measurementSelected].weight, customer.height);

    const { waist, hip } = customer.measurements![measurementSelected].circumference!;

    this.icc = this.bodyCompositionService.calcICC(waist, hip);
    this.ica = this.bodyCompositionService.calcICA(waist, customer.height)
  }
}
