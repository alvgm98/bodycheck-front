import { Component, ElementRef } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private el: ElementRef) { }

  showLogin: boolean = false;
  showRegister: boolean = false;

  toggleShowLogin() {
    // Si se encuentra abierto lo cerramos
    if (this.showLogin) {
      this.closeLogin();
      return;
    }

    // TODO cerrar registro si esta abierto

    this.showLogin = true;
  }
  toggleShowRegister() {

    // TODO cerrar registro si esta abierto

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
}
