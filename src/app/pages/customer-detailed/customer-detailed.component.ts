import { Component, input, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerDetailed } from '../../models/customer';

@Component({
  selector: 'app-customer-detailed',
  standalone: true,
  imports: [],
  templateUrl: './customer-detailed.component.html',
  styleUrl: './customer-detailed.component.scss'
})
export class CustomerDetailedComponent implements OnInit {

  customerId = input.required<number>();
  customer?: CustomerDetailed;
  loading = true;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.loadCustomer(this.customerId()).subscribe({
      next: (data) => {
        this.customer = data
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

}
