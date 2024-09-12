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

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [DatePickerComponent, CheckboxComponent, TextareaComponent, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
  animations: [
    trigger('appointment-form-animation', [
      state('open', style({ top: '50%', scale: 1, transform: 'translate(-50%, -50%)' })),
      state('closed', style({ top: '100%', scale: 0 })),
      transition('* => open, open => closed', animate('300ms'))
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

  customerId: GenericObject | null = null;
  date: Date = new Date();
  observations: string = "";

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private modalService: ModalService
  ) {
    effect(() => this.animationState = modalService.showOverlay() ? 'open' : 'closed')

    this.date = appointmentService.selectedDate();
  }

  // TODO OnInit para cuando hay un appointment de input

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
   * Si hubiera datos en el campo 'customer' se mueven a 'customerName'
   */
  registeredCustomerCheckedChange() {
    if (!this.registeredCustomer) {
      const customerName = this.controls.customer.value;
      this.appointmentForm.patchValue({
        customer: "",
        customerName: customerName
      })
    }
  }

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


    const year = this.date.getFullYear();
    const month = ('0' + (this.date.getMonth() + 1)).slice(-2); // Los meses comienzan desde 0
    const day = ('0' + this.date.getDate()).slice(-2);

    return `${year}-${month}-${day}T${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`;
  }
}
