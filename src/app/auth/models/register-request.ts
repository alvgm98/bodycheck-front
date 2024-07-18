import { Situation } from "./enums/situation.enum";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phone: string;
  situation: Situation;
  username: string;
  password: string;
}
