import { Component, input, OnInit } from '@angular/core';
import { CustomerSummaryComponent } from './pages/customer-summary/customer-summary.component';
import { CustomerDetailed } from '../shared/models/customer';
import { CustomerService } from '../shared/services/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CustomerSummaryComponent],
  templateUrl: './customer.component.html',
  styles: [`
    :host {
      flex: 1;
      box-sizing: border-box;
      width: 100%;
      padding: 60px 100px;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class CustomerComponent implements OnInit {
  customerId = input.required<number>();
  customer?: CustomerDetailed;

  loading = true;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.loadCustomer(this.customerId()).subscribe({
      next: (data) => {
        this.customer = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }
}
