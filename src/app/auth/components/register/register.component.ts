import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  /* Errores recibidos del backend */
  registerError: string = '';
  private errorMessages: { [key: number]: string } = {
    0: 'Ha ocurrido un error. Intentalo de nuevo más tarde!',
    409: 'Ya existe una cuenta con este email.',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  /* Validaciones del formulario */
  registerForm = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    username: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    password2: ["", [Validators.required]],
  })
  get firstName() {
    return this.registerForm.controls.firstName;
  }
  get lastName() {
    return this.registerForm.controls.lastName;
  }
  get phone() {
    return this.registerForm.controls.phone;
  }
  get username() {
    return this.registerForm.controls.username;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get password2() {
    return this.registerForm.controls.password2;
  }

  register() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this.registerForm.get("password")!.reset();
      return;
    }

    this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
      next: () => {
        this.closeModal();
        this.registerForm.reset();
      },
      error: (error) => {
        this.registerError = this.errorMessages[error.status] || "Error: " + error.status;
      }
    })
  }

  /* Lógica de cerrar el modal */
  @Output() closeModalEvent = new EventEmitter<void>();
  closeModal() {
    this.closeModalEvent.emit();
  }
}
