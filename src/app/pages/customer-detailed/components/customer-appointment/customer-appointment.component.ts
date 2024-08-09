import { Component, input } from '@angular/core';
import { Appointment } from '../../../../models/appointment';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../../../../pipes/capitalize.pipe';

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
