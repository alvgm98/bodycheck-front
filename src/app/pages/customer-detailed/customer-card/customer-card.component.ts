import { Component, input } from '@angular/core';
import { Customer } from '../../../models/customer';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { CalculateAgePipe } from '../../../pipes/calculate-age.pipe';

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
