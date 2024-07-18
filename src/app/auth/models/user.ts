import { Situation } from "./enums/situation.enum";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  situation: Situation;
}
