import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DateUtilService } from './util/date-util.service';
import { Appointment, AppointmentRequest } from '../models/appointment';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  selectedDate = signal<Date>(new Date());
  agendaAppointments = signal<Appointment[]>([]);

  constructor(
    private http: HttpClient,
    private dateUtil: DateUtilService,
    private datePipe: DatePipe
  ) {
    this.loadAppointmentsByDate();
  }

  loadAppointmentsByDate(): void {
    this.http.get<Appointment[]>(
      environment.apiAppointmentUrl + '/date/' + this.datePipe.transform(this.selectedDate(), 'yyyy-MM-dd'))
      .pipe(
        tap(appointments =>
          this.agendaAppointments.set(this.dateUtil.initializeAppointments(appointments))
        )
      ).subscribe();
  }

  addAppointment(appointment: AppointmentRequest) {
    return this.http.post<Appointment>(environment.apiAppointmentUrl, appointment)
      .pipe(
        /* Añadimos la cita a la lista de citas si la fecha seleccionada es la misma que la de creación */
        tap(data => {
          const f = new Date(data.date); // Al ser en el backend tipo Date, viene en formato "yyyy-MM-dd" en string
          const auxSelectedDate = new Date(this.selectedDate()); // Creamos esta constante ya que 'this.selectedDate()' puede llegar como un objeto del tipo Moment, usando diferentes funciones

          if (
            f.getDay() == auxSelectedDate.getDay()
            && f.getMonth() == auxSelectedDate.getMonth()
            && f.getFullYear() == auxSelectedDate.getFullYear()
          ) {
            this.agendaAppointments.set(this.dateUtil.initializeAppointments([...this.agendaAppointments(), data]))
          }
        })
      )
  }

  updateAppointment(appointment: AppointmentRequest) {
    return this.http.put<Appointment>(`${environment.apiAppointmentUrl}/${appointment.id}`, appointment)
      .pipe(
        tap(data => {
          // Eliminamos la cita anterior para que se borre del layout
          this.deleteFromAppointments(data.id);

          // Añadimos la cita a la lista de citas si la fecha seleccionada es la misma que la de creación
          const f = new Date(data.date); // Al ser en el backend tipo Date, viene en formato "yyyy-MM-dd" en string
          const auxSelectedDate = new Date(this.selectedDate()); // Creamos esta constante ya que 'this.selectedDate()' puede llegar como un objeto del tipo Moment, usando diferentes funciones

          if (
            f.getDay() == auxSelectedDate.getDay()
            && f.getMonth() == auxSelectedDate.getMonth()
            && f.getFullYear() == auxSelectedDate.getFullYear()
          ) {
            this.agendaAppointments.set(this.dateUtil.initializeAppointments([...this.agendaAppointments(), data]))
          }
        })
      )
  }

  deleteAppointment(id: number) {
    return this.http.delete<Appointment>(`${environment.apiAppointmentUrl}/${id}`)
      .pipe(
        tap(() => {
          this.deleteFromAppointments(id);
        }),
        catchError(err => {
          if (err.status === 404) {
            this.deleteFromAppointments(id);
          }
          throw err;
        })
      )
  }

  private deleteFromAppointments(id: number) {
    // Elimino la cita del listado
    const appointments = [...this.agendaAppointments()];
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments.splice(index, 1);
    }

    this.agendaAppointments.set(this.dateUtil.initializeAppointments(appointments))
  }
}
