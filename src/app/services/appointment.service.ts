import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Appointment } from '../models/appointment';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DateUtilService } from './util/date-util.service';

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
}
