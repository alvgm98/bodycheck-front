import { Component, inject } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [DatePickerComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {
  datePipe: DatePipe = inject(DatePipe);

  selectedDate: Date = new Date();
}
