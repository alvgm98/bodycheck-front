import { User } from "./user";

export interface AuthReponse {
  token: string,
  user: User,
}
