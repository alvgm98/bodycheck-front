export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  gender: string;
  height: number;
  observations: string;
}

export type CustomerKey = keyof Customer;
