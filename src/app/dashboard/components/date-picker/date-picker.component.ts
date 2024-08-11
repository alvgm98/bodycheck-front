import { ChangeDetectionStrategy, Component, model } from '@angular/core';
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
export class DatePickerComponent {
  selected = model<Date>(new Date());
}
