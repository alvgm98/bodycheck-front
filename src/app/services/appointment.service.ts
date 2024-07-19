import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Appointment } from '../models/appointment';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  selectedDate = signal<Date>(new Date());
  agendaAppointments = signal<Appointment[]>([]);

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.loadAppointmentsByDate();
  }

  loadAppointmentsByDate(): void {
    this.http.get<Appointment[]>(
      environment.apiAppointmentUrl + '/date/' + this.datePipe.transform(this.selectedDate(), 'yyyy-MM-dd'))
      .pipe(
        tap(appointments =>
          this.agendaAppointments.set(
            appointments.map(appointment => {
              appointment.date = new Date(appointment.date);
              appointment.startTime = new Date(appointment.startTime);
              appointment.endTime = new Date(appointment.endTime);
              appointment.duration = this.calcDuration(appointment.startTime, appointment.endTime)
              return appointment;
            })
          )
        )
      ).subscribe();
  }

  private calcDuration(startTime: Date, endTime: Date) {
    /* No tenemos en cuenta los segundos
    Al hacerlo de esta manera MODIFICAMOS los Date originales,
    lo cual deseamos para no volver a sumar el segundo que agregamos en backend en posibles modificaciones posteriores */
    startTime.setSeconds(0, 0);
    endTime.setSeconds(0, 0);

    const diffInMilliseconds = endTime.getTime() - startTime.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    return diffInMinutes;
  }
}
