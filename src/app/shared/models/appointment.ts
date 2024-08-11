import { Customer } from "./customer";

export interface Appointment {
  id: number;
  customer: Customer;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  reason: string;
  observations: string;
}
