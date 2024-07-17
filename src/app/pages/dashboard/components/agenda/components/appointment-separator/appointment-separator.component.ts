import { Component, input } from '@angular/core';

@Component({
  selector: 'app-appointment-separator',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './appointment-separator.component.scss',
  host: {
    '[style.top.px]': 'top()'
  },
})
export class AppointmentSeparatorComponent {
  top = input.required<number>();
}
