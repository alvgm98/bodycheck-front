import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private TOKEN_KEY = 'token';

  isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    const token = this.cookieService.get(this.TOKEN_KEY);
    this.isUserLogged = new BehaviorSubject<boolean>(token != null && token != ''); // Debe compararse con '' ya que esta version de CookieService al no encontrar la cookie la iguala a '' en vez de (null | undefined)
  }

  login(credentials: LoginRequest) {

    // TODO. comprobar las credenciales en el backend y recibir el token

    this.cookieService.set(this.TOKEN_KEY, "prueba", undefined, "/");
    this.isUserLogged.next(true);
  }

  logout() {
    this.cookieService.delete(this.TOKEN_KEY);
    this.isUserLogged.next(false);
  }
}
