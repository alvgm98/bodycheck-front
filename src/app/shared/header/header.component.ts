import { Component } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showLogin: boolean = false;
  showRegister: boolean = false;

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
  }
  toggleShowRegister() {
    this.showRegister = !this.showRegister;
  }

  closeModals() {
    this.showLogin = false;
    this.showRegister = false;
  }
}
