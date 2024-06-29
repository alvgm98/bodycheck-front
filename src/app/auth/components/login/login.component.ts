import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginError: string = '';
  private errorMessages: { [key: number]: string } = {
    0: 'Ha ocurrido un error. Intentalo de nuevo más tarde!',
    401: 'Email o Contraseña incorrectos.',
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  /* Formulario */
  loginForm = this.fb.group({
    username: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  })
  get username() {
    return this.loginForm.controls.username;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
      next: () => this.closeModal(),
      error: (error) => {
        this.loginError = this.errorMessages[error.status] || 'Error desconocido. Intentalo de nuevo más tarde!';
        console.error(error);
      }
    });
  }

  /* Lógica de cerrar el modal */
  @Output() closeModalEvent = new EventEmitter<void>();
  closeModal() {
    this.closeModalEvent.emit();
  }
}
