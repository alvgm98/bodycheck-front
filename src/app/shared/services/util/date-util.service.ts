import { Injectable } from '@angular/core';
import { Appointment } from '../../models/appointment';
import { Measurement } from '../../models/measurement';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  /** Ordenamos las citas por fecha y calculamos la duración de cada una */
  initializeAppointments(appointments: Appointment[]) {
    return appointments
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .map((appointment, index) => {
      appointment.number = index + 1;
      appointment.date = new Date(appointment.date);
      appointment.startTime = new Date(appointment.startTime);
      appointment.endTime = new Date(appointment.endTime);
      appointment.duration = this.calcDuration(appointment.startTime, appointment.endTime);
      return appointment;
    })
  }

  /** Ordenamos las mediciones por fecha y cargamos el valor del atributo sesion */
  initializeMeasurements(measurements: Measurement[]) {
    return measurements
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((measurement, index) => {
        measurement.session = index + 1;
        return measurement;
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
