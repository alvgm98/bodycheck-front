import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, model, Renderer2 } from '@angular/core';
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

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    const labels = this.el.nativeElement.querySelectorAll('.mat-calendar-table-header span');

    this.renderer.setProperty(labels[1], 'textContent', 'L');
    this.renderer.setProperty(labels[3], 'textContent', 'M');
    this.renderer.setProperty(labels[5], 'textContent', 'X');
    this.renderer.setProperty(labels[7], 'textContent', 'J');
    this.renderer.setProperty(labels[9], 'textContent', 'V');
    this.renderer.setProperty(labels[11], 'textContent', 'S');
    this.renderer.setProperty(labels[13], 'textContent', 'D');
  }
}
