import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter'

import 'moment/locale/es';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
    provideMomentDateAdapter()
  ],
  imports: [MatCardModule, MatDatepickerModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements AfterViewInit {
  selected = model<Date>(new Date());

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    const labels = this.el.nativeElement.querySelectorAll('.mat-calendar-table-header span')

    labels[1].textContent = 'L';
    labels[3].textContent = 'M';
    labels[5].textContent = 'M';
    labels[7].textContent = 'J';
    labels[9].textContent = 'V';
    labels[11].textContent = 'S';
    labels[13].textContent = 'D';

   /*  labels[1].textContent = 'Lunes';
    labels[3].textContent = 'Martes';
    labels[5].textContent = 'Miercoles';
    labels[7].textContent = 'Jueves';
    labels[9].textContent = 'Viernes';
    labels[11].textContent = 'Sabado';
    labels[13].textContent = 'Domingo'; */

    /* labels.forEach((label: HTMLElement) => {
      label.style.fontWeight = 'bold';
    }) */
  }

}
