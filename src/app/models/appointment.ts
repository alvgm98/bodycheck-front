import { Customer } from "./customer";

export interface Appointment {
  id: number;
  customer: Customer;
  startTime: Date;
  endTime: Date;
  reason: string;
  observations: string;
}
