import { Component, effect, input, OnInit, output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleButtonComponent } from '../../ui/toggle-button/toggle-button.component';
import { SelectInputComponent } from '../../ui/select-input/select-input.component';
import { TextareaComponent } from '../../ui/textarea/textarea.component';
import { Ethnicity, ETHNICITY_OPTIONS, stringToEthnicity } from '../../models/enums/ethnicity.enum';
import { CustomerService } from '../../services/customer.service';
import { Gender } from '../../models/enums/gender.enum';
import { Customer } from '../../models/customer';
import { ModalService } from '../modal.service';
import { MessageService } from '../../../message-modal/message.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ToggleButtonComponent, SelectInputComponent, TextareaComponent, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  animations: [
    trigger('customer-form-animation', [
      state('open', style({ top: '50%', scale: 1, transform: 'translate(-50%, -50%)' })),
      state('closed', style({ top: '100%', scale: 0 })),
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
export class CustomerFormComponent implements OnInit {
  animationState: string = 'closed';

  customer = input<Customer>();

  public ETHNICITY_OPTIONS = ETHNICITY_OPTIONS;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private modalService: ModalService,
    private messageService: MessageService
  ) {
    effect(() => this.animationState = modalService.showOverlay() ? 'open' : 'closed')
  }

  /**
   * Al Iniciar el componente comprobamos si ha recibido a customer por input
   * true: Mostramos sus datos en formulario listos para modificar
   * flase: Mostramos un formulario vacío listo para crear un nuevo customer
   */
  ngOnInit(): void {
    if (this.customer()) {
      const customer = this.customer()!;

      this.customerForm.patchValue({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        birthdate: customer.birthdate.toString(),
        height: customer.height.toString(),
        gender: customer.gender,
        ethnicity: Ethnicity[customer.ethnicity],
        target: customer.target,
        observations: customer.observations
      });
    }
  }

  /**
   * Envia la señal al service de cerrar componente. Leerán la señal:
   * - Este componente: Ejecutando la animación de cerrar
   * - El componente padre: Destruyendo el componente con la duración de la animación de retraso
   */
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

  /* SETTERS. Para campos obtenidos a traves de componentes */
  // Gender
  setGender(gender: string) {
    this.customerForm.patchValue({
      gender: Gender[gender.charAt(0) as keyof typeof Gender]
    });
  }
  // Ethnicity
  setEthnicity(ethnicity: string) {
    this.customerForm.patchValue({
      ethnicity: ethnicity
    });
  }
  // Observations
  setObservations(observations: string) {
    this.customerForm.patchValue({
      observations: observations
    });
  }

  /* SUBMIT */
  submit() {
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    if (this.customer()) {
      this.editCustomer();
    } else {
      this.createCustomer();
    }
  }

  // Create
  private createCustomer() {
    const customer: Customer = this.formToCustomer();

    this.customerService.addCustomer(customer).subscribe({
      complete: () => {
        this.messageService.emitSuccess("Cliente creado con exito")
        this.close();
      }
    });
  }

  // Edit
  updatedCustomerEvent = output<Customer>();
  private editCustomer() {
    const customer: Customer = this.formToCustomer();

    this.customerService.updateCustomer(customer).subscribe({
      next: (data) => {
        this.updatedCustomerEvent.emit(data);
        this.messageService.emitSuccess("Cliente actualizado con exito")
        this.close();
      }
    })
  }

  private formToCustomer(): Customer {
    const id: number | null = this.customer() ? this.customer()!.id : null;

    return {
      id: id,
      firstName: this.controls.firstName.value!,
      lastName: this.controls.lastName.value!,
      email: this.controls.email.value!,
      phone: this.controls.phone.value!,
      birthdate: new Date(this.controls.birthdate.value!),
      height: Number(this.controls.height.value!),
      gender: this.controls.gender.value!,
      ethnicity: stringToEthnicity(this.controls.ethnicity.value!),
      target: this.controls.target.value!,
      observations: this.controls.observations.value!,
    }
  }
}
