import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender } from '../../models/enums/gender.enum';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { Customer } from '../../models/customer';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { ethnicityOptions } from '../../models/enums/ethnicity.enum';

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

  ethnicityOptions: string[] = ethnicityOptions;

  constructor(private fb: FormBuilder) { }

  customerForm = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    email: ["", [Validators.email]],
    birthdate: ["", [Validators.required]],
    height: ["", [Validators.required]],
    gender: [Gender.M],
    ethnicity: ["", [Validators.required]],
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

    console.log(this.customerForm.value)
    console.log(this.customerForm.value as unknown as Customer)
  }

}
