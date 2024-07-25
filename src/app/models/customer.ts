import { Ethnicity } from "./enums/ethnicity.enum";
import { Gender } from "./enums/gender.enum";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  height: number;
  gender: Gender;
  ethnicity: Ethnicity;
  observations: string;
}

export type CustomerKey = keyof Customer;
