import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { Appointment } from '../../../shared/models/appointment';

@Component({
  selector: 'app-customer-appointment',
  standalone: true,
  imports: [DatePipe, CapitalizePipe],
  templateUrl: './customer-appointment.component.html',
  styleUrl: './customer-appointment.component.scss'
})
export class CustomerAppointmentComponent {
  appointment = input.required<Appointment>();
}
