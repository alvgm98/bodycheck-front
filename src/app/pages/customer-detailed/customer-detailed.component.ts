import { Component, input, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerDetailed } from '../../models/customer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerCardComponent } from './customer-card/customer-card.component';

@Component({
  selector: 'app-customer-detailed',
  standalone: true,
  imports: [CustomerCardComponent, MatProgressSpinnerModule],
  templateUrl: './customer-detailed.component.html',
  styleUrl: './customer-detailed.component.scss'
})
export class CustomerDetailedComponent implements OnInit {

  customerId = input.required<number>();
  customer!: CustomerDetailed;
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
