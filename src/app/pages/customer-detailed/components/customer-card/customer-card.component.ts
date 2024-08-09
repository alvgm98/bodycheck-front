import { Component, input } from '@angular/core';
import { CapitalizePipe } from '../../../../pipes/capitalize.pipe';
import { CalculateAgePipe } from '../../../../pipes/calculate-age.pipe';
import { Customer } from '../../../../models/customer';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [CapitalizePipe, CalculateAgePipe],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss'
})
export class CustomerCardComponent {
  customer = input.required<Customer>()
}
