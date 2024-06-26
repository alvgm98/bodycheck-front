import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private fb: FormBuilder) { }

  /* Validaciones del formulario */
  loginFrom = this.fb.group({
    username: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  })

  get username() {
    return this.loginFrom.controls.username;
  }

  get password() {
    return this.loginFrom.controls.password;
  }

  login() {
    if (!this.loginFrom.valid) {
      this.loginFrom.markAllAsTouched();
      this.loginFrom.get("password")!.reset();
      return;
    }

    this.loginFrom.reset();
    // TODO redirigir al programa
  }

  /* Lógica de cerrar el modal */
  @Output() closeModalEvent = new EventEmitter<void>();
  closeModal() {
    this.closeModalEvent.emit();
  }

}
