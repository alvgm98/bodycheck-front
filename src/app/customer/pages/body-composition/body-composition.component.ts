import { Component, effect, input, OnInit } from '@angular/core';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';
import { CustomerDetailed } from '../../../shared/models/customer';
import { ImcComponent } from './components/imc/imc.component';

@Component({
  selector: 'app-body-composition',
  standalone: true,
  imports: [ImcComponent],
  templateUrl: './body-composition.component.html',
  styleUrl: './body-composition.component.scss'
})
export class BodyCompositionComponent {

  customer = input.required<CustomerDetailed>();
  measurementSelected = input.required<number>();

  imc!: number;

  constructor(
    private bodyCompositionService: BodyCompositionService
  ) {
    effect(() => this.calcFormulas(this.customer(), this.measurementSelected()));
  }

  calcFormulas(customer: CustomerDetailed, measurementSelected: number): void {
    this.imc = this.bodyCompositionService.calcIMC(customer.measurements![measurementSelected].weight, customer.height);
  }
}
