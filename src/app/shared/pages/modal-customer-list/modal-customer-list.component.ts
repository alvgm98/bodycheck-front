import { AfterViewInit, Component, ElementRef, inject, input, output, Renderer2 } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { FilterCustomersPipe } from '../../pipes/filter-customers.pipe';

@Component({
  selector: 'app-modal-customer-list',
  standalone: true,
  imports: [FilterCustomersPipe],
  templateUrl: './modal-customer-list.component.html',
  styleUrl: './modal-customer-list.component.scss',
  host: {
    'class': 'modal-customer-list'
  }
})
export class ModalCustomerListComponent implements AfterViewInit {

  customers: Customer[];
  filterCondition = "";
  filterConditionInput = input.required<string | null>();

  outputEvent = output<Customer | string>()

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.customers = inject(CustomerService).customers();
  }

  ngAfterViewInit(): void {
    const searchInput = this.el.nativeElement.querySelector('#modalCustomerListSearchInput');
    this.renderer.selectRootElement(searchInput).focus()
  }

  noRegisteredCustomer(filterValue: string) {
    this.outputEvent.emit(filterValue);
  }

  selectCustomer(customer: Customer) {
    this.outputEvent.emit(customer);
  }
}
