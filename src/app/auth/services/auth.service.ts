import { Injectable, signal } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AuthReponse } from '../models/auth-reponse';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'token';
  private USER_KEY = 'user';

  isUserLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showRegister = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    const token = this.cookieService.get(this.TOKEN_KEY);
    this.isUserLogged = new BehaviorSubject<boolean>(token != null && token != ''); // Debe compararse con '' ya que esta version de CookieService al no encontrar la cookie la iguala a '' en vez de (null | undefined)
  }

  login(credentials: LoginRequest) {
    return this.http.post<AuthReponse>(environment.apiAuthUrl + "login", credentials).pipe(
      tap(response => {
        // Establecemos 1 dia a la expiracion de las cookies
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        // Guardamos el token y el user en las cookies
        this.cookieService.set(this.TOKEN_KEY, response.token, expirationDate);
        this.cookieService.set(this.USER_KEY, JSON.stringify(response.user), expirationDate);
        // Marcamos como loggeado y redirigimos a '/app'
        this.isUserLogged.next(true);
        this.router.navigateByUrl("app");
      }),
      catchError(error => {
        return throwError(() => error);
      })
    )
  }

  logout() {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.delete(this.USER_KEY);
    this.isUserLogged.next(false);
    this.router.navigateByUrl("");
  }

  register(userData: RegisterRequest) {
    return this.http.post<AuthReponse>(environment.apiAuthUrl + "register", userData).pipe(
      tap(response => {
        // Guardamos el token y el user en las cookies
        this.cookieService.set(this.TOKEN_KEY, response.token);
        this.cookieService.set(this.USER_KEY, JSON.stringify(response.user));
        // Marcamos como loggeado y redirigimos a '/app'
        this.isUserLogged.next(true);
        this.router.navigateByUrl("app");
      }),
      catchError(error => {
        return throwError(() => error);
      })
    )
  }
}
