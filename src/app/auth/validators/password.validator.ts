import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Si no hay valor sólo mostramos el error de Required
    if (!value) {
      return null;
    }

    const errors: any = {};

    const hasUpperCase = /[A-Z]/.test(value);
    if (!hasUpperCase) {
      errors.upperCase = 'La contraseña debe contener al menos una letra mayúscula.';
    }

    const hasLowerCase = /[a-z]/.test(value);
    if (!hasLowerCase) {
      errors.lowerCase = 'La contraseña debe contener al menos una letra minúscula.';
    }

    const hasNumeric = /[0-9]/.test(value);
    if (!hasNumeric) {
      errors.numeric = 'La contraseña debe contener al menos un dígito.';
    }

    const hasSpecialChar = /[!¡¿@#€$%^&*()~/,?.·":{}|<>=]/.test(value);
    if (!hasSpecialChar) {
      errors.specialChar = 'La contraseña debe contener al menos un carácter especial.';
    }

    const hasMinLength = value.length >= 8;
    if (!hasMinLength) {
      errors.minLength = 'La contraseña debe tener al menos 8 caracteres.';
    }

    return Object.keys(errors).length ? errors : null;
  }
}

export function passwordsMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const form = formGroup as FormGroup;
    const control = form.controls[controlName];
    const matchingControl = form.controls[matchingControlName];

    // Si password2 no tiene valor mostraremos el error de Required
    if (!matchingControl.value) {
      return null;
    }

    // Establecemos el error en password2
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordsMatch: true });
      return { passwordsMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  }
}
