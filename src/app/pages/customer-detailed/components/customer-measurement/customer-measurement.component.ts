import { Component, input } from '@angular/core';
import { Measurement } from '../../../../models/measurement';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../../../../pipes/capitalize.pipe';

@Component({
  selector: 'app-customer-measurement',
  standalone: true,
  imports: [DatePipe, CapitalizePipe],
  templateUrl: './customer-measurement.component.html',
  styleUrl: './customer-measurement.component.scss'
})
export class CustomerMeasurementComponent {
  measurement = input.required<Measurement>()
}
