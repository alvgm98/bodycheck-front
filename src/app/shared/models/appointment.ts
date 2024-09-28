import { Customer } from "./customer";
import { GenericObject } from "./generic";

export interface Appointment {
  id: number;
  customer: Customer | null;
  customerName: string | null;
  customerPhone: string | null;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  reason: string;
  observations: string;
}

export interface AppointmentRequest {
  id: number | null;
  customer: GenericObject | null;
  customerName: string | null;
  customerPhone: string | null;
  date: Date;
  startTime: string;
  endTime: string;
  reason: string;
  observations: string;
}
