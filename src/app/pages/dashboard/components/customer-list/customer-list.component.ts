import { AfterViewInit, ChangeDetectorRef, Component, effect, ElementRef, output } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { Customer, CustomerKey } from '../../../../models/customer';
import { CapitalizePipe } from '../../../../pipes/capitalize.pipe';
import { CalculateAgePipe } from '../../../../pipes/calculate-age.pipe';
import { FilterInputComponent } from '../../../../components/filter-input/filter-input.component';
import { FilterCustomersPipe } from '../../../../pipes/filter-customers.pipe';
import { PaginateCustomersPipe } from '../../../../pipes/paginate-customers.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [FilterInputComponent, CapitalizePipe, CalculateAgePipe, PaginateCustomersPipe, NgClass, RouterLink, MatProgressSpinnerModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements AfterViewInit {

  loadingCustomers = true;

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  /* Filter */
  filterCondition: string = '';

  /* Sorter */
  sortFields: CustomerKey[] = ['firstName', 'phone', 'email', 'birthdate'];
  sortField: CustomerKey = 'id';
  sortOrder: string = 'asc';

  /* Paginator */
  page: number = 0;
  pageSize: number = 5;

  constructor(
    private customerService: CustomerService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private filterPipe: FilterCustomersPipe
  ) {
    this.customerService.loadCustomers();

    effect(() => {
      this.customers = customerService.customers();
      if (this.customers.length > 0) {
        this.setFilteredCustomers();
      }
    })

    effect(() => {
      if (!customerService.loading()) {
        this.loadingCustomers = false;
      }
    })
  }

  ngAfterViewInit(): void {
    this.calculatePageSize();
    this.cdr.detectChanges();
  }

  /* Filter */
  filterValue(filter: string) {
    this.filterCondition = filter;
    this.setFilteredCustomers();
  }

  setFilteredCustomers() {
    this.filteredCustomers = this.filterPipe.transform(this.customers, this.filterCondition);
  }

  /* Sorter */
  changeSort(field: CustomerKey) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }

  /* Paginator */
  calculatePageSize() {
    const hostHeight = this.el.nativeElement.offsetHeight;
    const controlsHeight = this.el.nativeElement.querySelector(".controls").offsetHeight;
    const paginatorHeight = this.el.nativeElement.querySelector(".paginator").offsetHeight;
    const rowHeight = this.el.nativeElement.querySelector("thead").offsetHeight;

    this.pageSize = Math.floor((hostHeight - controlsHeight - paginatorHeight - rowHeight) / rowHeight);
  }

  changePage(page: number) {
    this.page = page;

    console.log(page);
  }

  changeToLastPage() {
    this.page = Math.floor(this.filteredCustomers.length / this.pageSize);
  }

  /* Abrir Customer Form Modal */
  openCustomerFormEvent = output<void>();
  openCustomerForm() {
    this.openCustomerFormEvent.emit();
  }
}
