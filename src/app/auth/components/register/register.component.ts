import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request';
import { passwordsMatchValidator, passwordStrengthValidator } from '../../validators/password.validator';
import { NgClass } from '@angular/common';
import { ToggleButtonComponent } from '../../../components/toggle-button/toggle-button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ToggleButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  @Input() usernameInput: string = "";
  // Necesito variar de esta manera el valor de username ya que el formulario se construye antes de recibir usernameInput
  ngOnInit(): void {
    this.registerForm.patchValue({
      username: this.usernameInput
    });
  }

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
    situation: ["Estudiante"],
    username: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, passwordStrengthValidator()]],
    password2: ["", [Validators.required]],
  }, {
    validators: passwordsMatchValidator('password', 'password2')
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

  selectSituation(situation: string) {
    this.registerForm.patchValue({
      situation: situation
    });
  }

  register() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
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

  closeModal() {
    this.authService.showRegister.set(false);
  }
}
