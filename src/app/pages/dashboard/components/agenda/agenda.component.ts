import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../services/appointment.service';
import { Appointment } from '../../../../models/appointment';
import { CapitalizePipe } from '../../../../pipes/capitalize.pipe';
import { AgendaAppointmentComponent } from './components/appointment/agenda-appointment.component';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [DatePickerComponent, AgendaAppointmentComponent, CommonModule, CapitalizePipe],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements AfterViewInit {
  selectedDate: Date = new Date();
  appointments: Appointment[] = [];

  hours: string[] = []

  constructor(
    private appointmentService: AppointmentService,
    private el: ElementRef
  ) {
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
    this.appointmentService.loadAppointmentsByDate(this.selectedDate)
      .subscribe((data) => {
        this.appointments = data;
      });
  }
}
