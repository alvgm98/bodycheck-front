import { Component, input, OnChanges } from '@angular/core';
import { Appointment } from '../../../../../../models/appointment';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  host: {
    '[style.flex-direction]': 'flexDirection',
    '[style.height.px]': 'height',
    '[style.top.px]': 'top'
  }
})
export class AppointmentComponent implements OnChanges {
  private MIN_SIZE = 3;

  appointment = input.required<Appointment>();

  /* Dynamic styles */
  flexDirection: string = 'column';
  height: number = 0;
  top: number = 0;
  timelineHeight: number = 0;

  ngOnChanges(): void {
    this.flexDirection = this.appointment().duration < 30 ? 'row' : 'column';
    this.height = this.appointment().duration * this.MIN_SIZE;
    this.top = (this.appointment().startTime.getHours() * 60 + this.appointment().startTime.getMinutes()) * this.MIN_SIZE;
    this.timelineHeight = this.appointment().duration * this.MIN_SIZE - 66;
  }

}
