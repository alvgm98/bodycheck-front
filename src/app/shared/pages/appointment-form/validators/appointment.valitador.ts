import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Este Validator controla que o bien haya un Customer seleccionado o se haya indicado el campo customerName y customerPhone
 * @returns devuelve un objeto con el campo del error o null si no hay error.
 */
export function customerRequiredValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const form = formGroup as FormGroup;

    const customer = form.controls['customer'];
    const customerName = form.controls['customerName'];
    const customerPhone = form.controls['customerPhone'];

    if (customer.value || (customerName.value && customerPhone.value)) {
      /* Eliminamos los errores que puedan tener si los hubiera */
      customer.setErrors(null);
      customerName.setErrors(null);
      customerPhone.setErrors(null);
      return null
    }

    customer.setErrors({ customerRequired: true });
    if (!customerName.value) {
      customerName.setErrors({ customerRequired: true });
    }
    if (!customerPhone.value) {
      customerPhone.setErrors({ customerRequired: true });
    }
    return { customerRequired: true };
  }
}
