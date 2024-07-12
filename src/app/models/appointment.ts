import { Customer } from "./customer";

export interface appointment {
  id: number;
  customer: Customer;
  startTime: Date;
  endTime: Date;
  reason: string;
  observations: string;
}
