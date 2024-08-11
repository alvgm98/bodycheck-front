import { Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleButtonComponent } from '../../ui/toggle-button/toggle-button.component';
import { SelectInputComponent } from '../../ui/select-input/select-input.component';
import { TextareaComponent } from '../../ui/textarea/textarea.component';
import { ethnicityOptions } from '../../models/enums/ethnicity.enum';
import { CustomerService } from '../../services/customer.service';
import { Gender } from '../../models/enums/gender.enum';
import { Customer } from '../../models/customer';


@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ToggleButtonComponent, SelectInputComponent, TextareaComponent, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  host: {
    'class': 'form-pop-up-animation'
  }
})
export class CustomerFormComponent {

  closeEvent = output<void>();
  successEvent = output<string>();

  ethnicityOptions = ethnicityOptions;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) { }

  customerForm = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    email: ["", [Validators.email]],
    birthdate: ["", [Validators.required]],
    height: ["", [Validators.required]],
    gender: [Gender.M],
    ethnicity: ["", [Validators.required]],
    target: ["", Validators.required],
    observations: [""]
  })
  get controls() {
    return this.customerForm.controls;
  }

  selectGender(gender: string) {
    this.customerForm.patchValue({
      gender: Gender[gender.charAt(0) as keyof typeof Gender]
    });
  }

  selectEthnicity(ethnicity: string) {
    this.customerForm.patchValue({
      ethnicity: ethnicity
    });
  }

  getObservations(observations: string) {
    this.customerForm.patchValue({
      observations: observations
    });
  }

  createCustomer() {
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.customerService.addCustomer(this.customerForm.value as unknown as Customer).subscribe({
      complete: () => {
        this.successEvent.emit("Cliente creado con exito")
        this.close();
      }
    });
  }

  close() {
    this.closeEvent.emit();
  }
}
