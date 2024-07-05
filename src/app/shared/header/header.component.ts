import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LoginComponent } from '../../auth/components/login/login.component';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  showLogin: boolean = false;

  showRegister: boolean = false;
  private showRegisterSubscription!: Subscription;

  isUserLogged: boolean = false;
  private isUserLoggedSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isUserLoggedSubscription = this.authService.isUserLogged.subscribe(
      (isLogged: boolean) => {
        this.isUserLogged = isLogged;
      }
    )
    this.showRegisterSubscription = this.authService.showRegister.subscribe(
      (isRegisterShown: boolean) => {
        this.showRegister = isRegisterShown;
      }
    )
  }
  ngOnDestroy(): void {
    if (this.isUserLoggedSubscription) {
      this.isUserLoggedSubscription.unsubscribe();
    }
    if (this.showRegisterSubscription) {
      this.showRegisterSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
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
    this.authService.showRegister.next(true);
  }

  closeLogin() {
    const modalCorner = this.el.nativeElement.querySelector(".modal-corner");
    modalCorner.style.display = "none" // Elimino la esquina del modal ya que durante la animación se superpone

    const loginModal = this.el.nativeElement.querySelector("#login-modal");
    loginModal.classList.remove("pop-in-login");
    loginModal.classList.add("pop-out-login");

    setTimeout(() => {
      this.showLogin = false;
    }, 300)
  }
  closeRegister() {
    if (this.showRegister) {
      this.authService.showRegister.next(false);
    }
  }
}
