import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender } from '../../models/enums/gender.enum';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ToggleButtonComponent, TextareaComponent, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {

  constructor(private fb: FormBuilder) { }

  customerForm = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    birthdate: ["", [Validators.required]],
    gender: [Gender.M],
    height: [0, [Validators.required]],
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

  getObservations(observations: string) {
    this.customerForm.patchValue({
      observations: observations
    });
  }

  createCustomer() {
    console.log(this.customerForm.value)
    console.log(this.customerForm.value as unknown as Customer)
  }

}
