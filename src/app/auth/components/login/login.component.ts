import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  /* Errores recibidos del backend */
  loginError: string = '';
  private errorMessages: { [key: number]: string } = {
    0: 'Ha ocurrido un error. Intentalo de nuevo más tarde!',
    401: 'Email o Contraseña incorrectos.',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: () => this.closeModal(),
      error: (error) => {
        this.loginError = this.errorMessages[error.status] || "Error: " + error.status;
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
