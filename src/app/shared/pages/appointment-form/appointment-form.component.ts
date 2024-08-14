import { Component, effect, model } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppointmentService } from '../../services/appointment.service';
import { DatePickerComponent } from '../../../dashboard/components/date-picker/date-picker.component';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { ModalService } from '../../services/util/modal.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [DatePickerComponent, CheckboxComponent],
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

  registeredCustomer = true;

  date = model<Date>(new Date());

  constructor(
    private appointmentService: AppointmentService,
    private modalService: ModalService
  ) {
    effect(() => this.animationState = modalService.showOverlay() ? 'open' : 'closed')

    this.setSelectedDate(appointmentService.selectedDate());
  }

  close() {
    this.modalService.closeAll();
  }

  setSelectedDate(date: Date) {
    this.date.set(date);
  }
}
