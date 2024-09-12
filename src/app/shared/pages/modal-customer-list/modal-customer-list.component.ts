import { AfterViewInit, Component, ElementRef, input, output, Renderer2, ViewChild } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-modal-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './modal-customer-list.component.html',
  styleUrl: './modal-customer-list.component.scss',
  host: {
    'class': 'modal-customer-list'
  }
})
export class ModalCustomerListComponent implements AfterViewInit {

  searchFilter = input.required<string | null>();

  outputEvent = output<Customer | string>()

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const searchInput = this.el.nativeElement.querySelector('#modalCustomerListSearchInput');
    this.renderer.selectRootElement(searchInput).focus()
  }

  noRegisteredCustomer(filterValue: string) {
    this.outputEvent.emit(filterValue);
  }
}
