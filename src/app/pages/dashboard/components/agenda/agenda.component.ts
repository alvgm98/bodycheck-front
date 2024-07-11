import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DatePipe, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [DatePickerComponent, NgClass, NgStyle],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  el: ElementRef = inject(ElementRef);
  datePipe: DatePipe = inject(DatePipe);
  selectedDate: Date = new Date();

  appointmentDuration: number = 15;
  startDate: Date = new Date(2024, 6, 11, 16, 30);

  ngOnInit(): void {
    // Scroll a la hora en la que estamos
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();

    const timetable = this.el.nativeElement.querySelector(".timetable");
    timetable.scrollTo({
      top: (mins - 30) * 3,
      behavior: 'smooth'
    })
  }

  getFinnishDate(startDate: Date, duration: number): Date {
    return new Date(startDate.getTime() + duration * 60000);
  }
}
