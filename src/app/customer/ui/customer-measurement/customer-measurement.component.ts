import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { Measurement } from '../../../shared/models/measurement';

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
