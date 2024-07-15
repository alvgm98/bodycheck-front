import { Component, output } from '@angular/core';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.scss'
})
export class FilterInputComponent {
  filterEvent = output<string>();

  emitFilter(filter: string) {
    this.filterEvent.emit(filter);
  }
}
