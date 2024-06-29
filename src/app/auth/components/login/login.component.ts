import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  /* Validaciones del formulario */
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

    this.loginService.login(this.loginForm.value as LoginRequest);
    this.closeModal();
  }

  /* Lógica de cerrar el modal */
  @Output() closeModalEvent = new EventEmitter<void>();
  closeModal() {
    this.closeModalEvent.emit();
  }
}
