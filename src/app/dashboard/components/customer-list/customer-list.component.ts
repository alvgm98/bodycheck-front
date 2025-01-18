import { AfterViewInit, ChangeDetectorRef, Component, effect, ElementRef, output } from '@angular/core';
import { CustomerService } from '../../../shared/services/customer.service';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { CalculateAgePipe } from '../../../shared/pipes/calculate-age.pipe';
import { FilterInputComponent } from '../../../shared/ui/filter-input/filter-input.component';
import { FilterCustomersPipe } from '../../../shared/pipes/filter-customers.pipe';
import { PaginateCustomersPipe } from '../../../shared/pipes/paginate-customers.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Customer, CustomerKey } from '../../../shared/models/customer';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [FilterInputComponent, PaginatorComponent, CapitalizePipe, CalculateAgePipe, PaginateCustomersPipe, RouterLink, MatProgressSpinnerModule],
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
      if (!customerService.customersLoading()) {
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
    this.page = 0;
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
  }

  /* Abrir Customer Form Modal */
  openCustomerFormEvent = output<void>();
  openCustomerForm() {
    this.openCustomerFormEvent.emit();
  }
}
