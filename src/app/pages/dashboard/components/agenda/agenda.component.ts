import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../services/appointment.service';
import { Appointment } from '../../../../models/appointment';
import { CapitalizePipe } from '../../../../pipes/capitalize.pipe';
import { AppointmentComponent } from './components/appointment/appointment.component';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [DatePickerComponent, AppointmentComponent, CommonModule, CapitalizePipe],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements AfterViewInit {
  el: ElementRef = inject(ElementRef);

  selectedDate: Date = new Date();
  appointments: Appointment[] = [];

  hours: string[] = []

  constructor(private appointmentService: AppointmentService) {
    this.getAppointmentsByDate();
    this.generateHours();
  }

  ngAfterViewInit(): void {
    // Scroll a la hora en la que estamos
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();

    const timetable = this.el.nativeElement.querySelector(".timetable");
    timetable.scrollTo({
      top: (mins - 30) * 3,
      behavior: 'smooth'
    })
  }

  /* Este metodo generá las horas del dia que se imprimirán en el template */
  generateHours(): void {
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;
      this.hours.push(`${hour}:00`);
      this.hours.push(`${hour}:30`);
    }
  }

  getAppointmentsByDate() {
    this.appointmentService.getAppointmentsByDate(this.selectedDate)
      .subscribe((data) => {
        this.appointments = data;
      });
  }
}
