import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Measurement, MeasurementRequest } from '../models/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  addMeasurement(measurement: MeasurementRequest) {
    return this.http.post<Measurement>(environment.apiMeasurementUrl, measurement);
  }

  updateMeasurement(measurement: MeasurementRequest) {
    return this.http.put<Measurement>(`${environment.apiMeasurementUrl}/${measurement.id}`, measurement);
  }

}
