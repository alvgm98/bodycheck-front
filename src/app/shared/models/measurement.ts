import { Customer } from "./customer";
import { GenericObject } from "./generic";

export interface Measurement {
  id: number;
  customer: Customer;
  session: number;
  date: Date;
  weight: number;
  circumference: Circumference;
  skinfold: Skinfold;
  diameter: Diameter;
  observations: string;
}

export interface MeasurementRequest {
  id: number | null;
  customer: GenericObject;
  session: number;
  date: Date;
  weight: number;
  circumference: Circumference;
  skinfold: Skinfold;
  diameter: Diameter;
  observations: string;
}

export interface Circumference {
  id: number | null;
  neck: number;
  chest: number;
  armRelaxed: number;
  armFlexed: number;
  waist: number;
  hip: number;
  thigh: number;
  calf: number;
}
export interface Skinfold {
  id: number | null;
  triceps: number;
  biceps: number;
  subscapular: number;
  suprailiac: number;
  iliacCrest: number;
  abdominal: number;
  thigh: number;
  calf: number;
}
export interface Diameter {
  id: number | null;
  biacromial: number;
  biIliacCrest: number;
  humeralBicondylar: number;
  femoralBicondylar: number;
  bistyloid: number;
  bimalleolar: number;
  transverseThoracic: number;
  anteroposteriorThoracic: number;
}
