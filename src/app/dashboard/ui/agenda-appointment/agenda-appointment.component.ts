import { Component, input, OnChanges, output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Appointment } from '../../../shared/models/appointment';
import { Router } from '@angular/router';
import { MessageService } from '../../../message-modal/message.service';
import { ModalService } from '../../../shared/pages/modal.service';

@Component({
  selector: 'app-agenda-appointment',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './agenda-appointment.component.html',
  styleUrl: './agenda-appointment.component.scss',
  host: {
    '[style.flex-direction]': 'flexDirection',
    '[style.height.px]': 'height',
    '[style.top.px]': 'top()'
  }
})
export class AgendaAppointmentComponent implements OnChanges {
  MINUTE_SIZE = input.required<number>();

  appointment = input.required<Appointment>();
  top = input.required<number>();

  /* Dynamic styles */
  flexDirection: string = 'column';
  height: number = 0;
  timelineHeight: number = 0;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private modalService: ModalService
  ) { }

  ngOnChanges(): void {
    this.flexDirection = this.appointment().duration < 30 ? 'row' : 'column';
    this.height = this.appointment().duration * this.MINUTE_SIZE();
    this.timelineHeight = this.appointment().duration * this.MINUTE_SIZE() - 66;
  }

  editAppointmentEvent = output<Appointment>();
  editAppointment() {
    this.editAppointmentEvent.emit(this.appointment());
  }

  viewCustomer() {
    if (this.appointment().customer) {
      this.router.navigateByUrl('app/customer/' + this.appointment().customer!.id);
    } else {
      this.messageService.emitInfo("  El cliente no se encuentra registrado.  \n  Por favor, registre al cliente primero.  ")
      this.modalService.openCustomerFromForRegister({
        name: this.appointment().customerName!,
        phone: this.appointment().customerPhone!,
        appointmentId: this.appointment().id
      });
    }
  }
}
