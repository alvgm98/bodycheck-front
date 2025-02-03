import { AfterViewInit, Component, effect, ElementRef, output, Renderer2 } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { AgendaAppointmentComponent } from '../../ui/agenda-appointment/agenda-appointment.component';
import { AppointmentSeparatorComponent } from '../../ui/appointment-separator/appointment-separator.component';
import { Appointment } from '../../../shared/models/appointment';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [DatePickerComponent, AgendaAppointmentComponent, AppointmentSeparatorComponent, CommonModule, CapitalizePipe],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements AfterViewInit {
  selectedDate: Date = new Date();
  appointments: Appointment[] = [];
  matchingDates: Date[] = [];

  hours: string[] = []
  MINUTE_SIZE = 3; // Pixeles que ocupa cada minuto

  constructor(
    private appointmentService: AppointmentService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.generateHours();

    effect(() => {
      this.appointments = appointmentService.agendaAppointments();
      this.matchingDates = this.getMatchingDates(this.appointments);
    })
  }

  ngAfterViewInit(): void {
    // Scroll a la hora en la que estamos
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();

    const timetable = this.el.nativeElement.querySelector(".timetable");
    this.renderer.setProperty(timetable, 'scrollTop', (mins - 30) * 3);
  }

  /* Este metodo generá las horas del dia que se imprimirán en el template */
  generateHours(): void {
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;
      this.hours.push(`${hour}:00`);
      this.hours.push(`${hour}:30`);
    }
  }

  selectDate() {
    this.appointmentService.selectedDate.set(this.selectedDate);
    this.getAppointmentsByDate();
  }
  getAppointmentsByDate() {
    this.appointmentService.loadAppointmentsByDate();
  }

  // Metodo para crear separadores entre citas contiguas
  getMatchingDates(appointments: Appointment[]): Date[] {
    const matchingDates: Date[] = [];
    const endTimesSet = new Set<string>();

    // Crear un Set de endTimes en formato 'HH:mm'
    appointments.forEach(appointment => {
      const endTime = appointment.endTime;
      const endTimeString = `${endTime.getHours()}:${endTime.getMinutes()}`;
      endTimesSet.add(endTimeString);
    });

    // Comparar startTimes con los endTimes almacenados en el Set
    appointments.forEach(appointment => {
      const startTime = appointment.startTime;
      const startTimeString = `${startTime.getHours()}:${startTime.getMinutes()}`;

      if (endTimesSet.has(startTimeString)) {
        // Añadir solo si no está ya en el array
        if (!matchingDates.some(date => date.getTime() === startTime.getTime())) {
          matchingDates.push(startTime);
        }
      }
    });

    return matchingDates;
  }

  calculatePosition(date: Date): number {
    return (date.getHours() * 60 + date.getMinutes()) * this.MINUTE_SIZE;
  }

  /* Abrir Appointment Form Modal */
  openAppointmentFormEvent = output<Appointment | null>();
  openAppointmentForm(appointment: Appointment | null = null) {
    this.openAppointmentFormEvent.emit(appointment);
  }
}
