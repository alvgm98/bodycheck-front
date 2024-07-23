import { Gender } from "./enums/gender.enum";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  gender: Gender;
  height: number;
  observations: string;
}

export type CustomerKey = keyof Customer;
