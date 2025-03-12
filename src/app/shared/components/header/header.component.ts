import { Component, effect, ElementRef, output, Renderer2 } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { Router } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, SettingsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showLogin: boolean = false;
  showRegister: boolean = false;
  showSettings: boolean = false;
  isUserLogged: boolean = false;

  scrollToTop = output<void>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {
    effect(() => this.showRegister = authService.showRegister());
    effect(() => this.isUserLogged = authService.isUserLogged());
  }

  logout() {
    this.showSettings = false;
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
    this.authService.showRegister.set(true);
  }
  toggleShowSettings() {
    if (this.showSettings) {
      this.closeSettings();
      return;
    }

    this.showSettings = true;
  }

  closeLogin() {
    const modalCorner = this.el.nativeElement.querySelector(".modal-corner");
    this.renderer.setStyle(modalCorner, 'display', 'none'); // Elimino la esquina del modal ya que durante la animación se superpone

    const loginModal = this.el.nativeElement.querySelector("#login-modal");
    this.renderer.removeClass(loginModal, 'pop-in-login');
    this.renderer.addClass(loginModal, 'pop-out-login');

    setTimeout(() => {
      this.showLogin = false;
    }, 300);
  }
  closeRegister() {
    if (this.showRegister) {
      this.authService.showRegister.set(false);
    }
  }

  closeSettings() {
    const settingsModal = this.el.nativeElement.querySelector("#settings");
    this.renderer.removeClass(settingsModal, 'pop-in-settings');
    this.renderer.addClass(settingsModal, 'pop-out-settings');

    setTimeout(() => {
      this.showSettings = false;
    }, 300);
  }

  clickTitle() {
    if (!this.isUserLogged) {
      this.closeRegister();
      this.scrollToTop.emit();
    } else {
      this.router.navigateByUrl("app");
    }
  }
}
