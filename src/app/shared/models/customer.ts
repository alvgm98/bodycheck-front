import { Appointment } from "./appointment";
import { Ethnicity } from "./enums/ethnicity.enum";
import { Gender } from "./enums/gender.enum";
import { Measurement } from "./measurement";

export interface Customer {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  height: number;
  gender: Gender;
  ethnicity: Ethnicity;
  target: string;
  observations: string;
}

export interface CustomerDetailed extends Customer {
  measurements?: Measurement[];
  appointments?: Appointment[];
}

export interface NoRegisteredCustomer {
  name: string,
  phone: string,
  appointmentId: number
}

export type CustomerKey = keyof Customer;
