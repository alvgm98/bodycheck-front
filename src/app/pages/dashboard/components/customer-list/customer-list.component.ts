import { AfterViewInit, Component, effect, ElementRef } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { Customer } from '../../../../models/customer';
import { CapitalizePipe } from '../../../../pipes/capitalize.pipe';
import { CalculateAgePipe } from '../../../../pipes/calculate-age.pipe';
import { FilterInputComponent } from '../../../../components/filter-input/filter-input.component';
import { FilterCustomersPipe } from '../../../../pipes/filter-customers.pipe';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [FilterInputComponent, CapitalizePipe, CalculateAgePipe, FilterCustomersPipe],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements AfterViewInit {

  customers: Customer[] = [];

  filterCondition: string = "";
  pageSize: number = 5;

  constructor(
    private customerService: CustomerService,
    private el: ElementRef
  ) {
    this.customerService.loadCustomers();

    effect(() => {
      this.customers = customerService.customers();
    })
  }

  ngAfterViewInit(): void {
    this.calculatePageSize();
  }

  filterValue(filter: string) {
    this.filterCondition = filter;
  }

  calculatePageSize() {
    const hostHeight = this.el.nativeElement.offsetHeight;
    const controlsHeight = this.el.nativeElement.querySelector(".controls").offsetHeight;
    // const paginatorSize = this.el.nativeElement.querySelector(".paginator"); NO OLVIDAR AÑADIR A LA OPERACIÓN

    this.pageSize = Math.floor((hostHeight - controlsHeight - 80) / 80);
  }
}
