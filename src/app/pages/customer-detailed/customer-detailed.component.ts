import { Component, input, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CustomerDetailed } from '../../models/customer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerAppointmentSummaryComponent } from './components/customer-appointment-summary/customer-appointment-summary.component';

@Component({
  selector: 'app-customer-detailed',
  standalone: true,
  imports: [CustomerCardComponent, MatProgressSpinnerModule, CustomerAppointmentSummaryComponent],
  templateUrl: './customer-detailed.component.html',
  styleUrl: './customer-detailed.component.scss'
})
export class CustomerDetailedComponent implements OnInit {

  customerId = input.required<number>();
  customer!: CustomerDetailed;

  measurementIndex: number = 0;

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
