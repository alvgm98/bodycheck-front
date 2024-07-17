import { Component, input, OnChanges } from '@angular/core';
import { Appointment } from '../../../../../../models/appointment';
import { CommonModule, NgClass } from '@angular/common';

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

  ngOnChanges(): void {
    this.flexDirection = this.appointment().duration < 30 ? 'row' : 'column';
    this.height = this.appointment().duration * this.MINUTE_SIZE();
    this.timelineHeight = this.appointment().duration * this.MINUTE_SIZE() - 66;
  }

}
