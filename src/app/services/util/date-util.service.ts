import { Injectable } from '@angular/core';
import { Appointment } from '../../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  initializeAppointments(appointments: Appointment[]) {
    return appointments.map(appointment => {
      appointment.date = new Date(appointment.date);
      appointment.startTime = new Date(appointment.startTime);
      appointment.endTime = new Date(appointment.endTime);
      appointment.duration = this.calcDuration(appointment.startTime, appointment.endTime);
      return appointment;
    })
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
