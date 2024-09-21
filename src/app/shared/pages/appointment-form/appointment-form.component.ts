import { Component, effect, input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppointmentService } from '../../services/appointment.service';
import { DatePickerComponent } from '../../../dashboard/components/date-picker/date-picker.component';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { ModalService } from '../modal.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../ui/textarea/textarea.component';
import { AppointmentRequest } from '../../models/appointment';
import { GenericObject } from '../../models/generic';
import { ModalCustomerListComponent } from '../modal-customer-list/modal-customer-list.component';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [DatePickerComponent, CheckboxComponent, TextareaComponent, ModalCustomerListComponent, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  animations: [
    trigger('appointment-form-animation', [
      state('open', style({ top: '50%', scale: 1, transform: 'translate(-50%, -50%)' })),
      state('closed', style({ top: '100%', scale: 0 })),
      state('showingCustomerList', style({ top: '50%', scale: 1, transform: 'translate(150%, -50%)' })),
      transition('* => open, * => closed', animate('300ms')),
      transition('open => showingCustomerList', animate('380ms'))
    ])
  ],
  host: {
    '[@appointment-form-animation]': 'animationState',
    'class': 'appointment-form'
  }
})
/**
 * Esta clase tiene una animación cuando abre y cuando se cierra el componente,
 * al ejecutar la animacion de cerrar actualiza los signals de ModalService, pero el componente no se destruye.
 *
 * Para usar correctamente este componente, debes subscribirte a los signals de ModalService
 * en el componente padre y ejecutar la destruccion del componente pasados 300ms de que el modal correspondiente torne a false.
 */
export class AppointmentFormComponent {
  animationState: string = 'closed';

  // appointment = input<Appointment>();

  registeredCustomer = true;
  showCustomerList = false;

  customerId: GenericObject | null = null;
  date: Date = new Date();
  observations: string = "";

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private modalService: ModalService
  ) {
    // Si el Service de modales envia la señal de que el Overlay se va a cerrar, se cerrará tambien el Componente
    effect(() => this.animationState = modalService.showOverlay() ? 'open' : 'closed')

    // Se seleccionará por defecto la fecha seleccionada en el dashboard
    this.date = appointmentService.selectedDate();
  }

  // TODO OnInit para cuando hay un appointment de input

  /** Envia la señal al Service de modales de que se deben cerrar los Modales y el Overlay */
  close() {
    this.modalService.closeAll();
  }

  appointmentForm = this.fb.group({
    customer: [""],
    customerName: [""],
    customerPhone: [""],
    startTime: ["", Validators.required],
    endTime: ["", Validators.required],
    reason: ["", Validators.required],
  })
  get controls() {
    return this.appointmentForm.controls;
  }

  /**
   * Se ejecuta al cambiar el estado del checkbox que indica si el Customer se encuentra registrado.
   * - Al cambiar a NO REGISTRADO: el valor del campo 'customer' se mueven a 'customerName'.
   * - Al cambiar a REGISTRADO: los campos 'customer' y 'customerName' se resetean y vaciamos el valor de customerId si hubiera un Customer seleccionado.
   */
  registeredCustomerCheckedChange() {
    // Al cambiar a NO REGISTRADO
    if (!this.registeredCustomer) {
      const customerName = this.controls.customer.value;
      this.appointmentForm.patchValue({
        customer: "",
        customerName: customerName
      })
    }
    // Al cambiar a REGISTRADO
    else {
      this.customerId = null;
    }
  }

  /**
   * Al escribir en el campo de Cliente, se ocultará momentaneamente el formulario para mostrar el listado de clientes
   */
  toggleShowCustomerList() {
    if (this.controls.customer.value) {
      this.animationState = 'showingCustomerList';
      this.showCustomerList = true;
    } else {
      this.closeShowCustomerList();
    }
  }

  /**
   * Recibe el valor del componente ModalCustomerList, donde se listan todos los Customer del usuario, dependiendo del tipo de 'customer'
   * - 'customer' es Customer -> Guardaremos el ID del Customer y mostraremos su nombre y apellidos.
   * - 'customer' es string -> Seleccionaremos que el Customer no se encuentra registrado e introduciremos el valor del input de filtrar los Customer en el campo 'customerName'
   * @param customer será un Customer si el usuario seleccionó uno, o el valor del input de filtrado si seleccionó que el Customer no se encuentra registrado
   */
  customerListEvent(customer: Customer | string) {
    // Volvemos a la vista inicial
    this.closeShowCustomerList();

    // CustomerList devolvió el valor del input de filtrado.
    if (typeof customer === 'string') {
      // Marcamos al cliente como no registrado
      this.registeredCustomer = false;
      // Reseteamos el campo customer y añadimos el valor con el que estabamos filtrando a 'customerName'
      this.appointmentForm.patchValue({
        customer: "",
        customerName: customer
      })
    }
    // CustomerList devolvió un Customer.
    else {
      // Marcamos al cliente como registrado si no lo estuviera
      this.registeredCustomer = true;
      // Mostramos el nombre y apellidos del Cliente seleccionado
      this.appointmentForm.patchValue({
        customer: customer.firstName + " " + customer.lastName,
      })
      // Guardamos el id del cliente en un Objeto Generico
      this.customerId = { id: customer.id! };
    }
  }

  /** Realiza la animación de ocultar ModalCustomerList y muestra el componente principal */
  private closeShowCustomerList() {
    this.animationState = 'open'
    setTimeout(() => this.showCustomerList = false, 380)
  }

  /* SUBMITS */
  submit() {
    if (!this.appointmentForm.valid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    // TODO separar logica de crear y editar appointment

    const appointment: AppointmentRequest = this.formToAppointment();

    this.appointmentService.addAppointment(appointment).subscribe({
      error: (error) => console.log(error)
    })

  }

  private formToAppointment(): AppointmentRequest {
    // TODO obtener el ID si es una edición
    const id = null;

    return {
      id: id,
      customer: this.customerId,
      customerName: this.controls.customerName.value!,
      customerPhone: this.controls.customerPhone.value!,
      date: this.date,
      startTime: this.setDateTime(this.controls.startTime.value!),
      endTime: this.setDateTime(this.controls.endTime.value!),
      reason: this.controls.reason.value!,
      observations: this.observations,
    }
  }

  private setDateTime(time: string): string {
    const [hour, min] = time.split(':').map(Number);

    const auxDate = new Date(this.date); // Creamos esta constante ya que 'this.date' puede llegar como un objeto del tipo Moment, usando diferentes funciones

    const year = auxDate.getFullYear();
    const month = ('0' + (auxDate.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0
    const day = ('0' + auxDate.getDate()).slice(-2);

    return `${year}-${month}-${day}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`;
  }
}
