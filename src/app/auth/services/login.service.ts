import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest) {
    console.log(credentials);
  }
}
