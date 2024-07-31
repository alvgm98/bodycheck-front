import { Component, model, output } from '@angular/core';
import { DatePickerComponent } from '../dashboard/components/date-picker/date-picker.component';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [DatePickerComponent],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  host: {
    'class': 'form-pop-up-animation'
  }
})
export class AppointmentFormComponent {

  closeEvent = output<void>();

  date = model<Date>(new Date());

  constructor(
    private appointmentService: AppointmentService
  ) {
    this.setSelectedDate(appointmentService.selectedDate());
  }

  setSelectedDate(date: Date) {
    this.date.set(date);
    console.log(date)
    console.log(this.date())
  }

  close() {
    this.closeEvent.emit();
  }
}
