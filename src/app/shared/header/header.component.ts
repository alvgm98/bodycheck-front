import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LoginComponent } from '../../auth/components/login/login.component';
import { RegisterComponent } from '../../auth/components/register/register.component';
import { LoginService } from '../../auth/services/login.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  showLogin: boolean = false;
  showRegister: boolean = false;
  isUserLogged: boolean = false;

  private loginSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.isUserLogged.subscribe(
      (isLogged: boolean) => {
        this.isUserLogged = isLogged;
      })
  }
  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  logout() {
    this.loginService.logout();
  }

  /* MANEJO DE MODALES */
  toggleShowLogin() {
    // Si se encuentra abierto lo cerramos
    if (this.showLogin) {
      this.closeLogin();
      return;
    }

    if (this.showRegister) {
      this.closeRegister();
    }
    this.showLogin = true;
  }
  toggleShowRegister() {
    // Si se encuentra abierto lo cerramos
    if (this.showRegister) {
      this.closeRegister();
      return;
    }

    if (this.showLogin) {
      this.closeLogin();
    }
    this.showRegister = true;
  }

  closeLogin() {
    const modalCorner = this.el.nativeElement.querySelector(".modal-corner")
    modalCorner.style.display = "none" // Elimino la esquina del modal ya que durante la animación se superpone

    const loginModal = this.el.nativeElement.querySelector("#login-modal");
    loginModal.classList.remove("pop-in-login");
    loginModal.classList.add("pop-out");

    setTimeout(() => {
      this.showLogin = false;
    }, 300)
  }
  closeRegister() {
    const registerModal = this.el.nativeElement.querySelector("#register-modal");
    registerModal.classList.remove("pop-in-register");
    registerModal.classList.add("pop-out");

    setTimeout(() => {
      this.showRegister = false;
    }, 300)
  }
}
