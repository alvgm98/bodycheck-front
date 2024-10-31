import { Component, input } from '@angular/core';
import { Appointment } from '../../../shared/models/appointment';
import { CustomerAppointmentComponent } from '../../ui/customer-appointment/customer-appointment.component';

@Component({
  selector: 'app-appointments-summary',
  standalone: true,
  imports: [CustomerAppointmentComponent],
  templateUrl: './appointments-summary.component.html',
  styleUrl: './appointments-summary.component.scss'
})
export class AppointmentsSummaryComponent {

  appointments = input.required<Appointment[]>();

}
