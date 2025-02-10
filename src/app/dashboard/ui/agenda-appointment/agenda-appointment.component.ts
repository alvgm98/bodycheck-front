import { Component, input, OnChanges, output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Appointment } from '../../../shared/models/appointment';
import { Router } from '@angular/router';

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
    private router: Router
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
      // TODO abrir formulario para crear cliente
    }
  }
}
