import { Component, effect, input } from '@angular/core';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';
import { CustomerDetailed } from '../../../shared/models/customer';
import { ImcComponent } from './components/imc/imc.component';
import { IccComponent } from './components/icc/icc.component';
import { IcaComponent } from './components/ica/ica.component';
import { CompositionPieComponent } from './components/composition-pie/composition-pie.component';
import { BodyComposition } from '../../../shared/models/body-composition';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-body-composition',
  standalone: true,
  imports: [ImcComponent, IccComponent, IcaComponent, CompositionPieComponent, MatProgressSpinner],
  templateUrl: './body-composition.component.html',
  styleUrl: './body-composition.component.scss'
})
export class BodyCompositionComponent {

  customer = input.required<CustomerDetailed>();
  measurementSelected = input.required<number>();

  trigger = input<number>(); // Cambio el valor de este trigger para ejecutar el effect de calcular formulas ya que los campos de customer no ejecutan el effect

  bodyComposition!: BodyComposition;

  constructor(
    private bodyCompositionService: BodyCompositionService
  ) {
    effect(() => {
      this.trigger();
      this.calcBodyComposition(this.customer(), this.measurementSelected());
    });
  }

  calcBodyComposition(customer: CustomerDetailed, measurementSelected: number) {
    this.bodyComposition = this.bodyCompositionService.calcBodyComposition(customer, measurementSelected)
  }
}
