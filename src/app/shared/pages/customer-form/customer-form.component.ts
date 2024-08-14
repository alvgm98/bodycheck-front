import { Component, effect, output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleButtonComponent } from '../../ui/toggle-button/toggle-button.component';
import { SelectInputComponent } from '../../ui/select-input/select-input.component';
import { TextareaComponent } from '../../ui/textarea/textarea.component';
import { ethnicityOptions } from '../../models/enums/ethnicity.enum';
import { CustomerService } from '../../services/customer.service';
import { Gender } from '../../models/enums/gender.enum';
import { Customer } from '../../models/customer';
import { ModalService } from '../../services/util/modal.service';


@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ToggleButtonComponent, SelectInputComponent, TextareaComponent, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  animations: [
    trigger('customer-form-animation', [
      state('open', style({ top: '50%', scale: 1, transform: 'translate(-50%, -50%)' })),
      state('closed', style({ top: '100%', scale: 0, transform: 'transform: translateX(-50%)' })),
      transition('* => open, open => closed', animate('300ms'))
    ])
  ],
  host: {
    '[@customer-form-animation]': 'animationState',
    'class': 'customer-form'
  }
})
/**
 * Esta clase tiene una animación cuando abre y cuando se cierra el componente,
 * al ejecutar la animacion de cerrar actualiza los signals de ModalService, pero el componente no se destruye.
 *
 * Para usar correctamente este componente, debes subscribirte a los signals de ModalService
 * en el componente padre y ejecutar la destruccion del componente pasados 300ms de que el modal correspondiente torne a false.
 */
export class CustomerFormComponent {
  animationState: string = 'closed';

  successEvent = output<string>();

  ethnicityOptions = ethnicityOptions;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private modalService: ModalService
  ) {
    effect(() => this.animationState = modalService.showOverlay() ? 'open' : 'closed')
  }

  close() {
    this.modalService.closeAll();
  }

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
}
