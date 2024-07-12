import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAppointmentsByDate(date: Date): Observable<Appointment[]> {
    const formattedDate = date.toISOString().split('T')[0];
    return this.http.get<Appointment[]>(environment.apiAppointmentUrl + 'date/' + formattedDate).pipe(
      map(appointments =>
        appointments.map(appointment => {
          appointment.startTime = new Date(appointment.startTime);
          appointment.endTime = new Date(appointment.endTime);
          appointment.duration = this.getDuration(appointment.startTime, appointment.endTime)
          return appointment;
        })
      )
    );
  }

  private getDuration(startTime: Date, endTime: Date) {
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
