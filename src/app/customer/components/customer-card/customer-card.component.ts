import { Component, input } from '@angular/core';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { CalculateAgePipe } from '../../../shared/pipes/calculate-age.pipe';
import { Customer } from '../../../shared/models/customer';

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
