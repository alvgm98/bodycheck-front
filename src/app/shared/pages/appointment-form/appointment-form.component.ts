import { Component, model, output } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DatePickerComponent } from '../../../dashboard/components/date-picker/date-picker.component';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [DatePickerComponent, CheckboxComponent],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  host: {
    'class': 'appointment-form form-pop-up-animation'
  }
})
export class AppointmentFormComponent {

  closeEvent = output<void>();

  registeredCustomer = true;

  date = model<Date>(new Date());

  constructor(
    private appointmentService: AppointmentService
  ) {
    this.setSelectedDate(appointmentService.selectedDate());
  }

  setSelectedDate(date: Date) {
    this.date.set(date);
  }

  close() {
    this.closeEvent.emit();
  }
}
