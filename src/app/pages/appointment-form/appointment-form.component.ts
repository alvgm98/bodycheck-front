import { Component, output } from '@angular/core';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  host: {
    'class': 'form-pop-up-animation'
  }
})
export class AppointmentFormComponent {

  closeEvent = output<void>();

  close() {
    this.closeEvent.emit();
  }
}
