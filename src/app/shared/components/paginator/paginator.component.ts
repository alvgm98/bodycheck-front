import { NgClass } from '@angular/common';
import { Component, input, OnChanges, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnChanges {
  listLenght = input.required<number>();
  pageSize = input.required<number>();

  pageEvent = output<number>();

  page: number = 0;
  lastPage: number = 0;

  /* Calculamos cual es la ultima página cada vez que un input es modificado */
  ngOnChanges(): void {
    this.calcLastPage();
  }

  private calcLastPage() {
    this.lastPage = Math.ceil(this.listLenght() / this.pageSize()) - 1;
  }

  changePage(page: number) {
    this.pageEvent.emit(page);
    this.page = page;
  }
}
