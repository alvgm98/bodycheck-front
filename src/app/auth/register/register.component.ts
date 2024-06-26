import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private fb: FormBuilder) { }

  /* Validaciones del formulario */
  registerForm = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    username: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  })
  get firstName() {
    return this.registerForm.controls.firstName;
  }
  get lastName() {
    return this.registerForm.controls.lastName;
  }
  get username() {
    return this.registerForm.controls.username;
  }
  get password() {
    return this.registerForm.controls.password;
  }

  register() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this.registerForm.get("password")!.reset();
      return;
    }

    this.registerForm.reset();
    // TODO registrar usuario
  }

  /* Lógica de cerrar el modal */
  @Output() closeModalEvent = new EventEmitter<void>();
  closeModal() {
    this.closeModalEvent.emit();
  }
}
