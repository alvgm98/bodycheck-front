import { Customer } from "./customer";

export interface Measurement {
  id: number;
  customer: Customer;
  session: number;
  date: Date;
  weight: number;
  circumference: Circumference;
  skinfold: Skinfold;
  observations: string;
}

export interface Circumference {
  id: number;
  armRelaxed: number;
  armFlexed: number;
  waist: number;
  hip: number;
  thigh: number;
  calf: number;
}
export interface Skinfold {
  id: number;
  triceps: number;
  biceps: number;
  subscapular: number;
  suprailiac: number;
  iliacCrest: number;
  abdominal: number;
  thigh: number;
  calf: number;
}
