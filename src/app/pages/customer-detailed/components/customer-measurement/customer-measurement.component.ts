import { Component, input } from '@angular/core';
import { Measurement } from '../../../../models/measurement';

@Component({
  selector: 'app-customer-measurement',
  standalone: true,
  imports: [],
  templateUrl: './customer-measurement.component.html',
  styleUrl: './customer-measurement.component.scss'
})
export class CustomerMeasurementComponent {
  measurement = input.required<Measurement>()
}
